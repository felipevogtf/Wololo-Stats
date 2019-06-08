import { DatabaseService } from './../services/database.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

	developers:Observable<any[]>;

	products: Observable<any[]>;

	prueba: Observable<any[]>;

	selectedView = 'devs';

	constructor(private db: DatabaseService) { }

	ngOnInit() {
		this.db.getDatabaseState().subscribe(rdy => {
			if (rdy) {
				this.developers = this.db.getDevs();
				this.products = this.db.getProducts();
			}
		});
	}

	probando() {
		this.db.getDatabaseState().subscribe(rdy => {
			if (rdy) {
				this.prueba = this.db.getDevs();
			}
		});
	} 
}
