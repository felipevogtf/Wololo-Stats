import { DatabaseService } from './../../services/database.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-technology',
	templateUrl: './technology.page.html',
	styleUrls: ['./technology.page.scss'],
})
export class TechnologyPage implements OnInit {

	technologies: Observable<any[]>;

	constructor(private db: DatabaseService) { }

	ngOnInit() {
		this.db.getDatabaseState().subscribe(rdy => {
			if (rdy) {
				this.technologies = this.db.getTechnologies();
			}
		});
	}
}
