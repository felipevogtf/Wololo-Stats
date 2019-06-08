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

	constructor(private plt: Platform, private sqlitePorter: SQLitePorter, private sqlite: SQLite, private http: HttpClient) {

		this.plt.ready().then(() => {
			this.sqlite.create({
				name: 'aoe2.db',
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
				this.loadCivilization();
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


	loadCivilization() {
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