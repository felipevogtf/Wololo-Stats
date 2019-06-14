import { DatabaseService } from './../../../services/database.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
	selector: 'app-view-structure',
	templateUrl: './view-structure.page.html',
	styleUrls: ['./view-structure.page.scss'],
})
export class ViewStructurePage implements OnInit {

	structure = null;

	constructor(private route: ActivatedRoute, private db: DatabaseService) { }

	ngOnInit() {
		this.route.paramMap.subscribe(params => {
			let id = params.get('id');

			this.db.getStructure(id).then(data => {
				this.structure = data;
			});
		});
	}

}
