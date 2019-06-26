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

		return this.database.executeSql('SELECT unit.*, age.name as age_name, civilization.name as civilization_name, structure.name as name_structure FROM unit INNER JOIN age ON unit.age = age.id_age INNER JOIN structure ON unit.created_in = structure.id_structure LEFT JOIN civilization ON unit.civilization = civilization.id_civilization WHERE id_unit = ?', [id]).then(data => {
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
				createdInName: data.rows.item(0).name_structure,
				civilization: data.rows.item(0).civilization,
				civilizationName: data.rows.item(0).civilization_name,
				age: data.rows.item(0).age_name,
				attackBonus: attackBonus
			}
		});
	}

	public getStructure(id) {
		return this.database.executeSql('SELECT structure.*, age.name as name_age, structure_type.name as type_name FROM structure INNER JOIN age ON structure.age = age.id_age INNER JOIN structure_type ON structure.type = structure_type.id_structure_type WHERE id_structure = ?', [id]).then(data => {
			return {
				id: data.rows.item(0).id_structure,
				name: data.rows.item(0).name,
				expansion: data.rows.item(0).expansion,
				wood: data.rows.item(0).wood,
				stone: data.rows.item(0).stone,
				gold: data.rows.item(0).gold,
				buildTime: data.rows.item(0).build_time,
				type: data.rows.item(0).type_name,
				age: data.rows.item(0).name_age
			}
		});
	}

	public getTechnology(id) {
		return this.database.executeSql('SELECT technology.*, age.name as name_age, civilization.name as civilization_name, structure.name as name_structure FROM technology INNER JOIN age ON technology.age = age.id_age INNER JOIN structure ON technology.develops_in = structure.id_structure LEFT JOIN civilization ON technology.civilization = civilization.id_civilization WHERE id_technology = ?', [id]).then(data => {
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
				developsName: data.rows.item(0).name_structure,
				civilization: data.rows.item(0).civilization,
				civilizationName: data.rows.item(0).civilization_name,
				age: data.rows.item(0).name_age
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
		let query = 'SELECT unit.*, age.name as age_name, civilization.name as civilization_name, structure.name as name_structure FROM unit INNER JOIN age ON unit.age = age.id_age INNER JOIN structure ON unit.created_in = structure.id_structure LEFT JOIN civilization ON unit.civilization = civilization.id_civilization';
		return this.database.executeSql(query, []).then(data => {
			let units = [];
			if (data.rows.length > 0) {
				for (var i = 0; i < data.rows.length; i++) {
					let attackBonus = [];
					if (data.rows.item(i).attack_bonus != '') {
						attackBonus = JSON.parse(data.rows.item(i).attack_bonus);
					}

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
						createdInName: data.rows.item(i).name_structure,
						civilization: data.rows.item(i).civilization,
						civilizationName: data.rows.item(i).civilization_name,
						age: data.rows.item(i).age_name,
						attackBonus: attackBonus
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

	public getStructureStats(id) {
		return this.database.executeSql('SELECT structure_stat.*, age.name as age_name FROM structure_stat INNER JOIN age ON structure_stat.age = age.id_age WHERE structure = ?', [id]).then(data => {
			let stats = [];
			if (data.rows.length > 0) {
				for (var i = 0; i < data.rows.length; i++) {
					stats.push({ 
						id: data.rows.item(i).id_structure_stat,
						hit_points: data.rows.item(i).hit_points,
						rate_of_fire: data.rows.item(i).rate_of_fire,
						range: data.rows.item(i).range,
						attack: data.rows.item(i).attack,
						melee_armor: data.rows.item(i).melee_armor,
						pierce_armor: data.rows.item(i).pierce_armor,
						line_of_sight: data.rows.item(i).line_of_sight,
						garrison: data.rows.item(i).garrison,
						name: data.rows.item(i).age_name,
						age: data.rows.item(i).age
					});
				}
			}
			return stats;
		});
	}
}