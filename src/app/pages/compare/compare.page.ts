import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CompareService } from './../../services/compare.service';
import { IonSlides } from '@ionic/angular';

@Component({
	selector: 'app-compare',
	templateUrl: './compare.page.html',
	styleUrls: ['./compare.page.scss'],
})
export class ComparePage implements OnInit {

	slideOpts = {
		initialSlide: 0,
		observer: true,
	};

	@ViewChild (IonSlides) public slide: IonSlides;

	constructor(public compare: CompareService) { }

	ngOnInit() {	
	}

	public resetList(){
		this.compare.reset();
	}

	public removeUnit(key){
		this.compare.removeUnit(key);
		this.slide.update();
		this.slide.slidePrev();
	}

}
