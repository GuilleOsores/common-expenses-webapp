import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
    ApartmentsComponent,
    BuildingsComponent,
    InvoicesComponent,
    ServicesComponent
} from './components'
 
const routes: Routes = [
    {
        path: 'buildings/:buildingId/apartments',
        component: ApartmentsComponent
    },
    {
        path: 'buildings/:buildingId/invoices',
        component: InvoicesComponent,
    },
    {
        path: 'buildings',
        component: BuildingsComponent,
    },
    {
        path: 'services',
        component: ServicesComponent,
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }