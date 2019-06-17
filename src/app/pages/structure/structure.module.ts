import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StructurePage } from './structure.page';
import { NgPipesModule } from 'ngx-pipes';

const routes: Routes = [
{
  path: '',
  component: StructurePage
},
{
  path: ':id',
  loadChildren: './view-structure/view-structure.module#ViewStructurePageModule'
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
  declarations: [StructurePage]
})
export class StructurePageModule {}
