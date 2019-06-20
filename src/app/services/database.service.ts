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

	constructor(private plt: Platform, private sqlitePorter: SQLitePorter, private sqlite: SQLite, private http: HttpClient) {

		this.plt.ready().then(() => {
			this.sqlite.create({
				name: 'ageofempire2def.db',
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
				this.dbReady.next(true);
			})
			.catch(e => console.error(e));	
		});
	}

	public getDatabaseState() {
		return this.dbReady.asObservable();
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

	public getStructure(id) {
		return this.database.executeSql('SELECT * FROM structure WHERE id_structure = ?', [id]).then(data => {
			return {
				id: data.rows.item(0).id_structure,
				name: data.rows.item(0).name,
				expansion: data.rows.item(0).expansion,
				wood: data.rows.item(0).wood,
				stone: data.rows.item(0).stone,
				gold: data.rows.item(0).gold,
				buildTime: data.rows.item(0).build_time,
				type: data.rows.item(0).type,
				age: data.rows.item(0).age
			}
		});
	}

	public getTechnology(id) {
		return this.database.executeSql('SELECT * FROM technology WHERE id_technology = ?', [id]).then(data => {
			return {
				id: data.rows.item(0).id_technology,
				name: data.rows.item(0).name,
				description: data.rows.item(0).description,
				expansion: data.rows.item(0).expansion,
				food: data.rows.item(0).food,
				wood: data.rows.item(0).wood,
				stone: data.rows.item(0).stone,
				gold: data.rows.item(0).gold,
				buildTime: data.rows.item(0).build_time,
				developsIn: data.rows.item(0).develops_in,
				civilization: data.rows.item(0).civilization,
				age: data.rows.item(0).age
			}
		});
	}

	public loadStructures() {
		let query = 'SELECT id_structure, name FROM structure';
		return this.database.executeSql(query, []).then(data => {
			let structures = [];
			if (data.rows.length > 0) {
				for (var i = 0; i < data.rows.length; i++) {
					structures.push({ 
						id: data.rows.item(i).id_structure,
						name: data.rows.item(i).name
					});
				}
			}
			return structures;
		});
	}

	public loadCivilizations() {
		let query = 'SELECT id_civilization, name, characteristic_civilization FROM civilization';
		return this.database.executeSql(query, []).then(data => {
			let civilizations = [];
			if (data.rows.length > 0) {
				for (var i = 0; i < data.rows.length; i++) {
					civilizations.push({ 
						id: data.rows.item(i).id_civilization,
						name: data.rows.item(i).name,
						description: data.rows.item(i).characteristic_civilization,
					});
				}
			}
			return civilizations;
		});
	}

	public loadUnits() {
		let query = 'SELECT id_unit, name FROM unit';
		return this.database.executeSql(query, []).then(data => {
			let units = [];
			if (data.rows.length > 0) {
				for (var i = 0; i < data.rows.length; i++) {
					units.push({ 
						id: data.rows.item(i).id_unit,
						name: data.rows.item(i).name
					});
				}
			}
			return units;
		});
	}

	public loadTechnologies() {
		let query = 'SELECT id_technology, name FROM technology';
		return this.database.executeSql(query, []).then(data => {
			let technologies = [];
			if (data.rows.length > 0) {
				for (var i = 0; i < data.rows.length; i++) {
					technologies.push({ 
						id: data.rows.item(i).id_technology,
						name: data.rows.item(i).name
					});
				}
			}
			return technologies;
		});
	}

	public getUnicUnitsCivilization(id) {
		return this.database.executeSql('SELECT id_unit, name, civilization FROM unit WHERE civilization = ?', [id]).then(data => {
			let units = [];
			if (data.rows.length > 0) {
				for (var i = 0; i < data.rows.length; i++) {
					units.push({ 
						id: data.rows.item(i).id_unit,
						name: data.rows.item(i).name
					});
				}
			}
			return units;
		});
	}

	public getUnicTechnologiesCivilization(id) {
		return this.database.executeSql('SELECT id_technology, name, civilization FROM technology WHERE civilization = ?', [id]).then(data => {
			let technologies = [];
			if (data.rows.length > 0) {
				for (var i = 0; i < data.rows.length; i++) {
					technologies.push({ 
						id: data.rows.item(i).id_technology,
						name: data.rows.item(i).name
					});
				}
			}
			return technologies;
		});
	}
}