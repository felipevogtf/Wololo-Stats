import { DatabaseService } from './../../../services/database.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';


@Component({
	selector: 'app-view-structure',
	templateUrl: './view-structure.page.html',
	styleUrls: ['./view-structure.page.scss'],
})
export class ViewStructurePage implements OnInit {

	structure = null;
	stats = new Array();
	
	public activeSlide = 0;

	@ViewChild (IonSlides) public slide: IonSlides;


	constructor(private route: ActivatedRoute, private db: DatabaseService) { }

	ngOnInit() {
		this.route.paramMap.subscribe(params => {
			let id = params.get('id');

			this.db.getStructure(id).then(data => {
				this.structure = data;
			});

			this.db.getStructureStats(id).then(data => {
				this.stats = data;
			});
		});

	}

	goTo(index){
		this.slide.slideTo(index);
	}

	setActiveIndex(event){
		event.target.getActiveIndex().then(number => {
			this.activeSlide = number;
		});
	}
}
