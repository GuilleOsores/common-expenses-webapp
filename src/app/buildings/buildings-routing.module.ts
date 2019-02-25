import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuildingsComponent } from './buildings/buildings.component';
import { ApartmentsComponent } from './apartment/apartments/apartments.component';
import { InvoicesComponent } from './invoice/invoices/invoices.component';

const routes: Routes = [
    {
        path: '',
        component: BuildingsComponent,
    },
    {
        path: ':buildingId/apartments',
        component: ApartmentsComponent
    },
    {
        path: ':buildingId/invoices',
        component: InvoicesComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class BuildingsRoutingModule { }