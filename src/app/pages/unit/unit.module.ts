import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UnitPage } from './unit.page';
import { NgPipesModule } from 'ngx-pipes';

const routes: Routes = [
{
  path: '',
  component: UnitPage
},
{
  path: ':id',
  loadChildren: './view-unit/view-unit.module#ViewUnitPageModule',
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
  declarations: [UnitPage]
})
export class UnitPageModule {}
