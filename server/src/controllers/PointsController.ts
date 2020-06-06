import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {

    public async create(request: Request, response: Response) {

        const {
            name,
            image,
            email,
            whatsapp,
            street,
            number,
            complement,
            district,
            city,
            uf,
            cep,
            latitude,
            longitude,
            items
         } = request.body;
      
        const trx = await knex.transaction();

        const address = {
            street: 'Rua Augusto Rush',
            number: '45',
            complement,
            district: 'Colubandê',
            city,
            uf,
            cep: '24451-650',
            latitude,
            longitude
        };
        const ids_address = await trx('adresses').insert(address);
         
        const id_address = ids_address[0];
        const point = {
            name,
            image: request.file.filename,
            email,
            whatsapp,
            id_address: id_address
        };
        const ids_points = await trx('points').insert(point);
        
        const id_point = ids_points[0];
        const points_items = items.split(',').map((id_item: number) => {
            return {
               id_item,
               id_point: id_point,
            }
        });
      
        await trx('points_items').insert(points_items);
      
        trx.commit();

        return response.json({ 
            id: id_point,
            ...point,
            ...address
         });
    }

    public async show(request: Request, response: Response) {
        const { id } = request.params;

        const point = await knex('points')
                            .join('adresses', 'points.id_address', '=', 'adresses.id')
                            .where('points.id', id)
                            .select('*')
                            .first()

        if (!point)
            return response.status(404).json({ message: 'Point not found'});
        
        const serializedPoint = {
            ...point,
            image_url: `http://192.168.1.69:3333/uploads/${point.image}`
        };
        
        const items = await knex('items')
                            .select('items.title')
                            .join('points_items', 'items.id', '=', 'points_items.id_item')
                            .where('points_items.id_point', id)

        return response.json({
            point: serializedPoint,
            items: items
        });
    }

    async index(request: Request, response: Response){
        const { city, uf, items } = request.query;

        const parsedItems = String(items)
                            .split(',')
                            .map(item => Number(item.trim()));

        const points = await knex('points')
                            .join('adresses', 'adresses.id', '=', 'points.id_address')
                            .join('points_items', 'points.id', '=', 'points_items.id_point')  
                            .where('adresses.city', String(city))
                            .where('adresses.uf', String(uf))
                            .whereIn('points_items.id_item', parsedItems)      
                            .distinct()
                            .select('points.*', 'adresses.latitude', 'adresses.longitude');             

          
        const serializedPoint = points.map(point => {
            return {
                ...point,
                image_url: `http://192.168.1.69:3333/uploads/${point.image}`
            }
        });

        response.json(serializedPoint);
    }
}

export default PointsController;