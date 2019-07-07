import { DatabaseService } from './../../services/database.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { IonSearchbar, ActionSheetController } from '@ionic/angular';
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
	isOpen = true;
	name = "";
	structure = "";

	@ViewChild (IonSearchbar) public searchbar: IonSearchbar;

	constructor(private db: DatabaseService, public actionSheetController: ActionSheetController) { }

	ngOnInit() {
		this.db.getDatabaseState().subscribe(rdy => {
			if (rdy) {
				this.db.loadTechnologies().then(data => {
					this.technologies = this.technologies.concat(data);
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
				text: 'Cuarteles',
				handler: () => {
					this.structure = 'Cuarteles';
				}
			}, {
				text: 'Muelle',
				handler: () => {
					this.structure = 'Muelle';
				}
			}, {
				text: 'Campamento Madero',
				handler: () => {
					this.structure = 'Campamento Madero';
				}
			}, {
				text: 'Molino',
				handler: () => {
					this.structure = 'Molino';
				}
			},{
				text: 'Campamento Minero',
				handler: () => {
					this.structure = 'Campamento Minero';
				}
			},{
				text: 'Centro Urbano',
				handler: () => {
					this.structure = 'Centro Urbano';
				}
			},{
				text: 'Galería de tiro con arco',
				handler: () => {
					this.structure = 'Galería de tiro con arco';
				}
			},{
				text: 'Herrería',
				handler: () => {
					this.structure = 'Herrería';
				}
			},{
				text: 'Mercado',
				handler: () => {
					this.structure = 'Mercado';
				}
			},{
				text: 'Establo',
				handler: () => {
					this.structure = 'Establo';
				}
			},{
				text: 'Castillo',
				handler: () => {
					this.structure = 'Castillo';
				}
			},{
				text: 'Monasterio',
				handler: () => {
					this.structure = 'Monasterio';
				}
			},{
				text: 'Taller de maquinaria de asedio',
				handler: () => {
					this.structure = 'Taller de maquinaria de asedio';
				}
			},{
				text: 'Universidad',
				handler: () => {
					this.structure = 'Universidad';
				}
			},{
				text: 'Cancel',
				icon: 'close',
				role: 'cancel',
				handler: () => {
					this.structure = "";
				}
			}]
		});
		await actionSheet.present();
	}

}
