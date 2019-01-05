import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuildingsComponent } from './components/buildings/buildings.component'
import { ApartmentsComponent } from './components/apartments/apartments.component'
 
const routes: Routes = [
    {
        path: 'buildings/:buildingId/apartments',
        component: ApartmentsComponent
    },
    {
        path: 'buildings',
        component: BuildingsComponent,
        children: [
            
        ]
    },    
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }