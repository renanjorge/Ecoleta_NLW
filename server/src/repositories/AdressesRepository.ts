import knex from '../database/connection';

class AdressesRepository {

    public async insert(address: AddressEntity) {

        const ids_address = await knex('adresses').insert(address);

        return ids_address;
    }
}

export default AdressesRepository;