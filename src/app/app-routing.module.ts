import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
    ApartmentsComponent,
    BuildingsComponent,
    InvoicesComponent,
    ServicesComponent,
    RolesComponent,
    UsersComponent
} from './components'
import { LoginComponent } from './components/login/login.component';
 
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
    },
    {
        path: 'users',
        component: UsersComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }