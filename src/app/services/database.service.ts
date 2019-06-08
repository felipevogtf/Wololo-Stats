import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
	providedIn: 'root'
})
export class DatabaseService {	
	
	private database: SQLiteObject;
	private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

	developers = new BehaviorSubject([]);
	products = new BehaviorSubject([]);
	civilizations = new BehaviorSubject([]);
	units = new BehaviorSubject([]);

	constructor(private plt: Platform, private sqlitePorter: SQLitePorter, private sqlite: SQLite, private http: HttpClient) {

		this.plt.ready().then(() => {
			this.sqlite.create({
				name: 'aoe22.db',
				location: 'default'
			})
			.then((db: SQLiteObject) => {
				this.database = db;
				this.seedDatabase();
			});
		});

	}

	seedDatabase() {
		this.http.get('assets/aoe2.sql', { responseType: 'text'})
		.subscribe(sql => {
			this.sqlitePorter.importSqlToDb(this.database, sql)
			.then(_ => {
				this.loadDevelopers();
				this.loadProducts();
				this.loadCivilizations();
				this.loadUnits();
				this.dbReady.next(true);
			})
			.catch(e => console.error(e));
		});
	}

	getDatabaseState() {
		return this.dbReady.asObservable();
	}

	getDevs(): Observable<any[]> {
		return this.developers.asObservable();
	}

	getProducts(): Observable<any[]> {
		return this.products.asObservable();
	}

	getCivilizations(): Observable<any[]> {
		return this.civilizations.asObservable();
	}
	getUnits(): Observable<any[]> {
		return this.units.asObservable();
	}


	loadCivilizations() {
		let query = 'SELECT * FROM civilization';
		return this.database.executeSql(query, []).then(data => {
			let civilizations = [];
			let bonus = [];
			if (data.rows.length > 0) {
				for (var i = 0; i < data.rows.length; i++) {
					civilizations.push({ 
						id: data.rows.item(i).id_civilization,
						name: data.rows.item(i).name,
						expansion: data.rows.item(i).expansion,
						characteristic: data.rows.item(i).characteristic_civilization,
						teamBonus: data.rows.item(i).team_bonus,
						bonus: JSON.parse(data.rows.item(i).bonus_civilization)
					});
				}
			}
			this.civilizations.next(civilizations);
		});
	}

	loadUnits() {
		let query = 'SELECT * FROM unit';
		return this.database.executeSql(query, []).then(data => {
			let units = [];
			let attackBonus = [];
			if (data.rows.length > 0) {
				for (var i = 0; i < data.rows.length; i++) {
					units.push({ 
						id: data.rows.item(i).id_unit,
						name: data.rows.item(i).name,
						expansion: data.rows.item(i).expansion,
						buildTime: data.rows.item(i).build_time,
						hitPoints: data.rows.item(i).hit_points,
						rateOfFire: data.rows.item(i).rate_of_fire,
						frameDelay: data.rows.item(i).frame_delay,
						range: data.rows.item(i).range,
						accuracy: data.rows.item(i).accuracy,
						projectileSpeed: data.rows.item(i).projectile_speed,
						meleeArmor: data.rows.item(i).melee_armor,
						pierceArmor: data.rows.item(i).pierce_armor,
						speed: data.rows.item(i).speed,
						lineOfSight: data.rows.item(i).line_of_sight,
						garrison: data.rows.item(i).garrison,
						blastRadius: data.rows.item(i).blast_radius,
						wood: data.rows.item(i).wood,
						gold: data.rows.item(i).gold,
						stone: data.rows.item(i).stone,
						food: data.rows.item(i).food,
						attack: data.rows.item(i).attack,
						createdIn: data.rows.item(i).created_in,
						civilization: data.rows.item(i).civilization,
						age: data.rows.item(i).age,
						attackBonus: JSON.parse(data.rows.item(i).attack_bonus)

					});
				}
			}
			this.units.next(units);
		});
	}

	loadDevelopers() {
		let query = 'SELECT * FROM unit';
		return this.database.executeSql(query, []).then(data => {
			let developers = [];
			if (data.rows.length > 0) {
				for (var i = 0; i < data.rows.length; i++) {
					developers.push({ 
						name: data.rows.item(i).name
					});
				}
			}
			this.developers.next(developers);
		});
	}

	loadProducts() {
		let query = 'SELECT * FROM civilization';
		return this.database.executeSql(query, []).then(data => {
			let products = [];
			if (data.rows.length > 0) {
				for (var i = 0; i < data.rows.length; i++) {
					products.push({ 
						name: data.rows.item(i).name,
						id: data.rows.item(i).id,
						creator: data.rows.item(i).creator,
					});
				}
			}
			this.products.next(products);
		});
	}

}