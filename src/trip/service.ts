import database from "../database";
import {NotFound} from "@curveball/http-errors";
import {Trip} from "./trip";

export class TripService {

	readonly fieldNames = [
		'id',
		'user',
		'destination',
		'start_date',
		'end_date',
		'comment'
	];

	async findAll(): Promise<Trip[]> {
		const query = `SELECT ${this.fieldNames.join(', ')} FROM trip`;
		const result = await database.query(query);

		const trips: Trip[] = [];
		for (const user of result[0]) {
			trips.push(new Trip(user));
		}
		return trips;
	}

	async findById(id: number): Promise<Trip> {
		const query = `SELECT ${this.fieldNames.join(', ')} FROM trip WHERE id = ?`;
		const result = await database.query(query, [id]);

		if (result[0].length !== 1) {
			throw new NotFound('Trip with id: ' + id + ' not found');
		}

		return new Trip(result[0][0]);
	}

	async save(user: Trip): Promise<Trip> {
		const query = 'INSERT INTO trip SET ?, created = CURRENT_TIMESTAMP()' +
			'ON DUPLICATE KEY UPDATE ?';
		const result = await database.query(query, [user, user]);
		// console.log('result', result);

		return result;
	}

	async del(tripID: string): Promise<any> {
		const query = 'DELETE FROM trip WHERE id = ?';
		const result = await database.query(query, [tripID]);
		// console.log('result', result);

		return result;
	}

}
