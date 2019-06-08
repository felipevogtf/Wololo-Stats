import { DatabaseService } from './../services/database.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-civilization',
	templateUrl: './civilization.page.html',
	styleUrls: ['./civilization.page.scss'],
})
export class CivilizationPage implements OnInit {

	civilization: Observable<any[]>;

	constructor(private db: DatabaseService) { }

	ngOnInit() {
		this.db.getDatabaseState().subscribe(rdy => {
			if (rdy) {
				this.civilization = this.db.getDevs();
			}
		});
	}

}
