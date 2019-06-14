import { DatabaseService } from './../../../services/database.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-view-civilization',
	templateUrl: './view-civilization.page.html',
	styleUrls: ['./view-civilization.page.scss'],
})
export class ViewCivilizationPage implements OnInit {

	civilization = null;

	constructor(private route: ActivatedRoute, private db: DatabaseService) { }

	ngOnInit() {
		this.route.paramMap.subscribe(params => {
			let id = params.get('id');

			this.db.getCivilization(id).then(data => {
				this.civilization = data;
			});
		});	}

	}
