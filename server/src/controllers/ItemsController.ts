import { Request, Response } from 'express';
import knex from '../database/connection';

class ItemsController {

    async index(request: Request, response: Response) {
        const items = await knex('items').select('id', 'title', 'icon');

        const serializedItems = items.map(item => {
           return {
                id: item.id,
                title: item.title,
                image_url: `http://192.168.1.69:3333/uploads/${item.icon}`
           }
        });
     
        return response.send(serializedItems);
    }

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const item = await knex('items')
                            .select('*')
                            .where('id', id)
                            .first();

        if (!item)
            return response.status(404).json({ message: 'Item not found' });

        response.json(item);
    }

}

export default ItemsController;