import { DatabaseService } from './../../../services/database.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-view-unit',
	templateUrl: './view-unit.page.html',
	styleUrls: ['./view-unit.page.scss'],
})
export class ViewUnitPage implements OnInit {

	unit = null;

	constructor(private route: ActivatedRoute, private db: DatabaseService) { }

	ngOnInit() {
		this.route.paramMap.subscribe(params => {
			let id = params.get('id');

			this.db.getUnit(id).then(data => {
				this.unit = data;
			});
		});
	}

}
