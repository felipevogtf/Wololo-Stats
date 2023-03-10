import { DatabaseService } from './../../services/database.service';
import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';
import { Observable } from 'rxjs';
import { IonSearchbar } from '@ionic/angular';
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
	selector: 'app-civilization',
	templateUrl: './civilization.page.html',
	styleUrls: ['./civilization.page.scss'],
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
export class CivilizationPage {

	civilizations = [];
	isOpen = true;
	name = "";
	
	@ViewChild (IonSearchbar) public searchbar: IonSearchbar;

	constructor(private db: DatabaseService) { }



	ngOnInit() {
		this.db.getDatabaseState().subscribe(rdy => {
			if (rdy) {
				this.db.loadCivilizations().then(data => {
					this.civilizations = this.civilizations.concat(data);
				});
			}
		});
	}

	onSearch(event){
		this.name = event.target.value;
	}
	openSearch(){
		this.isOpen = false;
		setTimeout(() => this.searchbar.setFocus(), 500);
	}
	closeSearch(){
		this.isOpen = true;
	}

	separateExpansion(record, recordIndex, records) {
		if(recordIndex == 0){
			return record.expansion;
		}

		if(record.expansion != records[recordIndex-1].expansion){
			return record.expansion;
		}
		return null;
	}
}
