import { DatabaseService } from './../services/database.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-structure',
	templateUrl: './structure.page.html',
	styleUrls: ['./structure.page.scss'],
})
export class StructurePage implements OnInit {


	structures: Observable<any[]>;

	constructor(private db: DatabaseService) { }

	ngOnInit() {
		this.db.getDatabaseState().subscribe(rdy => {
			if (rdy) {
				this.structures = this.db.getStructures();
			}
		});
	}
}
