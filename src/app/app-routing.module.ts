import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
{ path: '', redirectTo: 'home', pathMatch: 'full' },
{ path: 'home', loadChildren: './home/home.module#HomePageModule' },
{ path: 'civilization', loadChildren: './civilization/civilization.module#CivilizationPageModule' },
{ path: 'unit', loadChildren: './unit/unit.module#UnitPageModule' },
{ path: 'structure', loadChildren: './structure/structure.module#StructurePageModule' },
{ path: 'technology', loadChildren: './technology/technology.module#TechnologyPageModule' },




];

@NgModule({
  imports: [
  RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
