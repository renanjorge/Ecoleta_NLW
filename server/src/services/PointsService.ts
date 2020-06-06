import AdressesRepository from '../repositories/AdressesRepository';

class PointsService {

    public create(address: Request) {

        const addressRepository = new AdressesRepository();

        const ids_adresses = addressRepository.insert(new AddressEntity());

        return ids_adresses;
    }

}

export default AdressesRepository;