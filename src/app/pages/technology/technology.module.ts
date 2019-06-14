import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TechnologyPage } from './technology.page';

const routes: Routes = [
{
  path: '',
  component: TechnologyPage
},
{ 
  path: ':id', 
  loadChildren: './view-technology/view-technology.module#ViewTechnologyPageModule' 
}
];

@NgModule({
  imports: [
  CommonModule,
  FormsModule,
  IonicModule,
  RouterModule.forChild(routes)
  ],
  declarations: [TechnologyPage]
})
export class TechnologyPageModule {}
