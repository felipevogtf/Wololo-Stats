import { DatabaseService } from './../../services/database.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-view-technology',
	templateUrl: './view-technology.page.html',
	styleUrls: ['./view-technology.page.scss'],
})
export class ViewTechnologyPage implements OnInit {

	technology = null;

	constructor(private route: ActivatedRoute, private db: DatabaseService) { }

	ngOnInit() {
		this.route.paramMap.subscribe(params => {
			let id = params.get('id');

			this.db.getTechnology(id).then(data => {
				this.technology = data;
			});
		});
	}

}
