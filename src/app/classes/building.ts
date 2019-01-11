import { Apartment } from './apartment';

export class Building {
    buildingsId: string;
    name: string;
    address: string;
    commonExpensesAmmount: number;
    apartments: Apartment[];

    constructor (buildingsId: string, name: string, address: string, commonExpensesAmmount: number) {
        this.buildingsId = buildingsId;
        this.name = name;
        this.address = address;
        this.commonExpensesAmmount = commonExpensesAmmount;
    }
}