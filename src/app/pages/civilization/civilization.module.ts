import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CivilizationPage } from './civilization.page';
import { NgPipesModule } from 'ngx-pipes';

const routes: Routes = [
{
  path: '',
  component: CivilizationPage,
},
{
  path: ':id',
  loadChildren: './view-civilization/view-civilization.module#ViewCivilizationPageModule',
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
  declarations: [CivilizationPage]
})
export class CivilizationPageModule {}
