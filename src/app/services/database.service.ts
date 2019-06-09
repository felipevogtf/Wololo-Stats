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

	private developers = new BehaviorSubject([]);
	private products = new BehaviorSubject([]);
	private civilizations = new BehaviorSubject([]);
	private units = new BehaviorSubject([]);
	private structures = new BehaviorSubject([]);
	private technologies = new BehaviorSubject([]);

	constructor(private plt: Platform, private sqlitePorter: SQLitePorter, private sqlite: SQLite, private http: HttpClient) {

		this.plt.ready().then(() => {
			this.sqlite.create({
				name: 'aoe2def.db',
				location: 'default'
			})
			.then((db: SQLiteObject) => {
				this.database = db;
				this.seedDatabase();
			});
		});

	}

	private seedDatabase() {
		this.http.get('assets/aoe2.sql', { responseType: 'text'})
		.subscribe(sql => {
			this.sqlitePorter.importSqlToDb(this.database, sql)
			.then(_ => {
				this.loadCivilizations();
				this.loadUnits();
				this.loadStructures();
				this.loadTechnologies();
				this.dbReady.next(true);
			})
			.catch(e => console.error(e));	
		});
	}

	public getDatabaseState() {
		return this.dbReady.asObservable();
	}

	public getDevs(): Observable<any[]> {
		return this.developers.asObservable();
	}

	public getProducts(): Observable<any[]> {
		return this.products.asObservable();
	}

	public getCivilizations(): Observable<any[]> {
		return this.civilizations.asObservable();
	}

	public getUnits(): Observable<any[]> {
		return this.units.asObservable();
	}

	public getStructures(): Observable<any[]> {
		return this.structures.asObservable();
	}

	public getTechnologies(): Observable<any[]> {
		return this.technologies.asObservable();
	}
	
	public getCivilization(id) {
		return this.database.executeSql('SELECT * FROM civilization WHERE id_civilization = ?', [id]).then(data => {
			let bonus = [];
			if (data.rows.item(0).bonus_civilization != '') {
				bonus = JSON.parse(data.rows.item(0).bonus_civilization);
			}

			return {
				id: data.rows.item(0).id_civilization,
				name: data.rows.item(0).name,
				expansion: data.rows.item(0).expansion,
				characteristic: data.rows.item(0).characteristic_civilization,
				teamBonus: data.rows.item(0).team_bonus,
				bonus: bonus

			}
		});
	}

	public getUnit(id) {
		return this.database.executeSql('SELECT * FROM unit WHERE id_unit = ?', [id]).then(data => {
			let attackBonus = [];
			if (data.rows.item(0).attack_bonus != '') {
				attackBonus = JSON.parse(data.rows.item(0).attack_bonus);
			}

			return {
				id: data.rows.item(0).id_unit,
				name: data.rows.item(0).name,
				expansion: data.rows.item(0).expansion,
				buildTime: data.rows.item(0).build_time,
				hitPoints: data.rows.item(0).hit_points,
				rateOfFire: data.rows.item(0).rate_of_fire,
				frameDelay: data.rows.item(0).frame_delay,
				range: data.rows.item(0).range,
				accuracy: data.rows.item(0).accuracy,
				projectileSpeed: data.rows.item(0).projectile_speed,
				meleeArmor: data.rows.item(0).melee_armor,
				pierceArmor: data.rows.item(0).pierce_armor,
				speed: data.rows.item(0).speed,
				lineOfSight: data.rows.item(0).line_of_sight,
				garrison: data.rows.item(0).garrison,
				blastRadius: data.rows.item(0).blast_radius,
				wood: data.rows.item(0).wood,
				gold: data.rows.item(0).gold,
				stone: data.rows.item(0).stone,
				food: data.rows.item(0).food,
				attack: data.rows.item(0).attack,
				createdIn: data.rows.item(0).created_in,
				civilization: data.rows.item(0).civilization,
				age: data.rows.item(0).age,
				attackBonus: attackBonus

			}
		});
	}

	private loadStructures() {
		let query = 'SELECT * FROM structure';
		return this.database.executeSql(query, []).then(data => {
			let structures = [];
			if (data.rows.length > 0) {
				for (var i = 0; i < data.rows.length; i++) {
					structures.push({ 
						id: data.rows.item(i).id_structure,
						name: data.rows.item(i).name,
						expansion: data.rows.item(i).expansion,
						wood: data.rows.item(i).wood,
						stone: data.rows.item(i).stone,
						gold: data.rows.item(i).gold,
						buildTime: data.rows.item(i).build_time,
						type: data.rows.item(i).type,
						age: data.rows.item(i).age
					});
				}
			}
			this.structures.next(structures);
		});
	}

	private loadCivilizations() {
		let query = 'SELECT id_civilization, name FROM civilization';
		return this.database.executeSql(query, []).then(data => {
			let civilizations = [];
			if (data.rows.length > 0) {
				for (var i = 0; i < data.rows.length; i++) {
					civilizations.push({ 
						id: data.rows.item(i).id_civilization,
						name: data.rows.item(i).name
					});
				}
			}
			this.civilizations.next(civilizations);
		});
	}

	private loadUnits() {
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

	private loadTechnologies() {
		let query = 'SELECT * FROM technology';
		return this.database.executeSql(query, []).then(data => {
			let technologies = [];
			if (data.rows.length > 0) {
				for (var i = 0; i < data.rows.length; i++) {
					technologies.push({ 
						id: data.rows.item(i).id_technology,
						name: data.rows.item(i).name,
						description: data.rows.item(i).description,
						expansion: data.rows.item(i).expansion,
						food: data.rows.item(i).food,
						wood: data.rows.item(i).wood,
						stone: data.rows.item(i).stone,
						gold: data.rows.item(i).gold,
						buildTime: data.rows.item(i).build_time,
						developsIn: data.rows.item(i).develops_in,
						civilization: data.rows.item(i).civilization,
						age: data.rows.item(i).age
					});
				}
			}
			this.technologies.next(technologies);
		});
	}


}