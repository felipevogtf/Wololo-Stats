import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TechnologyPage } from './technology.page';
import { NgPipesModule } from 'ngx-pipes';

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
  NgPipesModule,
  CommonModule,
  FormsModule,
  IonicModule,
  RouterModule.forChild(routes)
  ],
  declarations: [TechnologyPage]
})
export class TechnologyPageModule {}
