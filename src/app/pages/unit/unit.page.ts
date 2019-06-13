import { DatabaseService } from './../../services/database.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-unit',
	templateUrl: './unit.page.html',
	styleUrls: ['./unit.page.scss'],
})
export class UnitPage implements OnInit {

	units: Observable<any[]>;
	
	constructor(private db: DatabaseService) { }

	ngOnInit() {
		this.db.getDatabaseState().subscribe(rdy => {
			if (rdy) {
				this.units = this.db.getUnits();
			}
		});
	}

}
