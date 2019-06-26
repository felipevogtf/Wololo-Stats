import { DatabaseService } from './../../../services/database.service';
import { CompareService } from './../../../services/compare.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
	selector: 'app-view-unit',
	templateUrl: './view-unit.page.html',
	styleUrls: ['./view-unit.page.scss'],
})
export class ViewUnitPage implements OnInit {

	unit = null;


	constructor(private route: ActivatedRoute, private db: DatabaseService, private compare: CompareService, public toastController: ToastController) { }

	ngOnInit() {
		this.route.paramMap.subscribe(params => {
			let id = params.get('id');

			this.db.getUnit(id).then(data => {
				this.unit = data;
			});
		});
	}

	async presentToast(message) {
		const toast = await this.toastController.create({
			message: message,
			duration: 2000
		});
		toast.present();
	}

	public addUnitToCompare(){
		if(!this.compare.findUnit(this.unit.id)){
			this.compare.addUnit(this.unit);
			this.presentToast('Unidad agregada a la comparación');
		}else{
			this.presentToast('La unidad ya esta agregada');
		}
	}
}
