import { Apartment } from './apartment';

export class Building {
    buildingsId: string;
    name: string;
    address: string;
    apartments: Apartment[];

    constructor (buildingsId: string, name: string, address: string) {
        this.buildingsId = buildingsId;
        this.name = name;
        this.address = address;
    }
}