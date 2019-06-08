import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {


	constructor() { }

	ngOnInit() {
	}

	probando() {
		this.db.getDatabaseState().subscribe(rdy => {
			if (rdy) {
				this.prueba = this.db.getDevs();
			}
		});
	} 
}
