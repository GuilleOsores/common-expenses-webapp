import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuildingsComponent } from './components/buildings/buildings.component'
 
const routes: Routes = [
    {
        path: 'buildings',
        component: BuildingsComponent
      },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }