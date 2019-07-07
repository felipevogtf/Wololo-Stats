import { DatabaseService } from './../../services/database.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { IonSearchbar, ActionSheetController } from '@ionic/angular';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
	selector: 'app-structure',
	templateUrl: './structure.page.html',
	styleUrls: ['./structure.page.scss'],
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
export class StructurePage {

	structures = [];
	isOpen = true;
	type = "";
	name = "";

	@ViewChild (IonSearchbar) public searchbar: IonSearchbar;

	constructor(private db: DatabaseService, public actionSheetController: ActionSheetController) { }

	ngOnInit() {
		this.db.getDatabaseState().subscribe(rdy => {
			if (rdy) {
				this.db.loadStructures().then(data => {
					this.structures = this.structures.concat(data);
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

	separateAge(record, recordIndex, records) {
		if(recordIndex == 0){
			return record.age;
		}

		if(record.age != records[recordIndex-1].age){
			return record.age;
		}
		return null;
	}

	async presentActionSheet() {
		const actionSheet = await this.actionSheetController.create({
			header: 'Estructuras',
			animated: true,
			cssClass: 'action-sheet',
			buttons: [{
				text: 'Económica',
				handler: () => {
					this.type = 'Económica';
				}
			}, {
				text: 'Investigación',
				handler: () => {
					this.type = 'Investigación';
				}
			}, {
				text: 'Militar',
				handler: () => {
					this.type = 'Militar';
				}
			}, {
				text: 'Defensiva',
				handler: () => {
					this.type = 'Defensiva';
				}
			},{
				text: 'Misceláneo',
				handler: () => {
					this.type = 'Misceláneo';
				}
			},{
				text: 'Cancel',
				icon: 'close',
				role: 'cancel',
				handler: () => {
					this.type = "";
				}
			}]
		});
		await actionSheet.present();
	}
}
