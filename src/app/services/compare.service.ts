import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class CompareService {

	private unitsToCompare = new Array();

	constructor() { 
		this.unitsToCompare = new Array();
	}

	public addUnit(unit){
		this.unitsToCompare.push(unit);
	}

	public removeUnit(unitKey){
		this.unitsToCompare.splice(unitKey, 1);
	}

	public findUnit(unitId){
		return this.unitsToCompare.find(unit => unit.id === unitId);
	}

	public reset(){
		this.unitsToCompare = [];
	}

	public getUnitsToCompare(){
		return this.unitsToCompare;
	}
}
