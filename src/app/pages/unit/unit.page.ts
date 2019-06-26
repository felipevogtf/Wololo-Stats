import { DatabaseService } from './../../services/database.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { IonSearchbar } from '@ionic/angular';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ToastController } from '@ionic/angular';
import { CompareService } from './../../services/compare.service';

@Component({
	selector: 'app-unit',
	templateUrl: './unit.page.html',
	styleUrls: ['./unit.page.scss'],
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
export class UnitPage {

	units = [];
	isOpen = true;
	name = "";

	@ViewChild (IonSearchbar) public searchbar: IonSearchbar;
	
	constructor(private db: DatabaseService, private compare: CompareService, public toastController: ToastController) { }

	ngOnInit() {
		this.db.getDatabaseState().subscribe(rdy => {
			if (rdy) {
				this.db.loadUnits().then(data => {
					this.units = this.units.concat(data);
				});
			}
		});
	}

	async presentToast(message) {
		const toast = await this.toastController.create({
			message: message,
			duration: 2000
		});
		toast.present();
	}

	public addUnitToCompare(unit){
		if(!this.compare.findUnit(unit.id)){
			this.compare.addUnit(unit);
			this.presentToast('Unidad agregada a la comparación');
		}else{
			this.presentToast('La unidad ya esta agregada');
		}
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
}
