import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
    ApartmentsComponent,
    BuildingsComponent,
    InvoicesComponent,
    ServicesComponent,
    RolesComponent
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
    },
    {
        path: 'roles',
        component: RolesComponent,
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }