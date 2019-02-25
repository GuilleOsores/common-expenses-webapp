import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 
const routes: Routes = [
    {
        path: 'buildings',
        loadChildren: './buildings/buildings.module#BuildingsModule',
    },
    {
        path: 'services',
        loadChildren: './services/services.module#ServicesModule',
    },
    {
        path: 'roles',
        loadChildren: './roles/roles.module#RolesModule',
    },
    {
        path: 'users',
        loadChildren: './users/users.module#UsersModule',
    },
    {
        path: 'login',
        loadChildren: './auth/auth.module#AuthModule',
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }