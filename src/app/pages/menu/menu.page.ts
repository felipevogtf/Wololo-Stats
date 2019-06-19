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
		url: '/menu/home',
		direction: 'root'
	},
	{
		tittle: 'Civilization',
		url: '/menu/civilization',
		direction: 'forward'
	},
	{
		tittle: 'Unit',
		url: '/menu/unit',
		direction: 'forward'
	},
	{
		tittle: 'Structure',
		url: '/menu/structure',
		direction: 'forward'
	},
	{
		tittle: 'Technology',
		url: '/menu/technology',
		direction: 'forward'
	},
	{
		tittle: 'Compare',
		url: '/menu/compare',
		direction: 'forward'
	},
	];

	constructor() {
	}

	ngOnInit() {
	}

}
