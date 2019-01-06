import { Building, Service } from './index';

export class Invoice {

    invoicesId: string
    year: number;
    month: number;
    ammount: number;
    dueDate: Date;
    paidDate: Date;
    service: Service;
    building: Building;

    constructor (invoicesId: string, year: number, month: number, ammount: number, dueDate: Date, service: Service) {
        
    }
    
}