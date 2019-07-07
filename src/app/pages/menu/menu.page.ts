import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

@Component({
	selector: 'app-menu',
	templateUrl: './menu.page.html',
	styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
	
	pages = [
	{
		tittle: 'Inicio',
		style: 'home',
		url: '/menu/home',
		icon: 'assets/icon/home/home-menu.svg',
		direction: 'root'
	},
	{
		tittle: 'Civilizaciones',
		style: 'civilization',
		url: '/menu/civilization',
		icon: 'assets/icon/home/civilization-menu.svg',
		direction: 'forward'
	},
	{
		tittle: 'Unidades',
		style: 'unit',
		url: '/menu/unit',
		icon: 'assets/icon/home/unit-menu.svg',
		direction: 'forward'
	},
	{
		tittle: 'Estructuras',
		style: 'structure',
		url: '/menu/structure',
		icon: 'assets/icon/home/structure-menu.svg',
		direction: 'forward'
	},
	{
		tittle: 'Tecnologías',
		style: 'technology',
		url: '/menu/technology',
		icon: 'assets/icon/home/technology-menu.svg',
		direction: 'forward'
	},
	{
		tittle: 'Comparar',
		style: 'compare',
		url: '/menu/compare',
		icon: 'assets/icon/home/compare-menu.svg',
		direction: 'forward'
	},
	];

	constructor() {
	}

	ngOnInit() {
	}

}
