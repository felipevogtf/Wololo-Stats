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
		tittle: 'Home',
		url: '/menu/home'
	},
	{
		tittle: 'Civilization',
		url: '/menu/civilization'
	},
	{
		tittle: 'Unit',
		url: '/menu/unit'
	},
	{
		tittle: 'Structure',
		url: '/menu/structure'
	},
	{
		tittle: 'Technology',
		url: '/menu/technology'
	},
	];

	constructor() {
	}

	ngOnInit() {
	}

}
