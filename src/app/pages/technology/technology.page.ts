import { DatabaseService } from './../../services/database.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { IonSearchbar } from '@ionic/angular';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
	selector: 'app-technology',
	templateUrl: './technology.page.html',
	styleUrls: ['./technology.page.scss'],
	animations: [
	trigger('openClose', [
		// ...
		state('open', style({
			visibility: 'visible',
			opacity: 1
		})),
		state('closed', style({
			visibility: 'hidden',
			height: 0,
			width: 0,
			opacity: 0
		})),
		transition('open => closed', [
			animate('0.3s')
			]),
		transition('closed => open', [
			animate('0.7s')
			]),
		]),
	],
})
export class TechnologyPage {

	technologies = [];
	size = 0;
	isOpen = true;
	name = "";

	@ViewChild (IonSearchbar) public searchbar: IonSearchbar;

	constructor(private db: DatabaseService) { }

	ionViewDidEnter() {
		this.db.getDatabaseState().subscribe(rdy => {
			if (rdy) {
				this.db.loadTechnologies().then(data => {
					this.technologies = this.technologies.concat(data);
					this.size = this.technologies.length - 15;
				});
			}
		});
	}

	onSearch(event){
		this.name = event.target.value;
		this.size = this.technologies.length/3;
	}
	openSearch(){
		this.isOpen = false;
		setTimeout(() => this.searchbar.setFocus(), 500);
	}
	closeSearch(){
		this.isOpen = true;
	}

	loadData(event){
		setTimeout(() => {
			console.log('Done');
			event.target.complete();
			if (this.size > 0) {
				this.size -= 15;
			}
		}, 500);
	}
}
