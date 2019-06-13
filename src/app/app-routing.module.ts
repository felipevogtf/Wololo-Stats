import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
{ path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
{ path: 'civilization', loadChildren: './pages/civilization/civilization.module#CivilizationPageModule' },
{ path: 'unit', loadChildren: './pages/unit/unit.module#UnitPageModule' },
{ path: 'structure', loadChildren: './pages/structure/structure.module#StructurePageModule' },
{ path: 'technology', loadChildren: './pages/technology/technology.module#TechnologyPageModule' },
{ path: '', loadChildren: './pages/menu/menu.module#MenuPageModule' },





];

@NgModule({
	imports: [
	RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
