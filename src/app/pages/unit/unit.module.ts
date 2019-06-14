import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UnitPage } from './unit.page';

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
  CommonModule,
  FormsModule,
  IonicModule,
  RouterModule.forChild(routes)
  ],
  declarations: [UnitPage]
})
export class UnitPageModule {}
