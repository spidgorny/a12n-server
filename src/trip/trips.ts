import Controller from '@curveball/controller';
import {Context} from '@curveball/core';
import {TripService} from './service';
import {Trip} from "./trip";

class TripController extends Controller {

	service: TripService;

	constructor() {
		super();
		this.service = new TripService();
	}

	async trips(ctx: Context) {
		ctx.response.body = {
			status: 'ok',
			trips: await this.service.findAll(),
		};
	}

	async redirectToLogin(ctx: Context, code: number, error: string) {
		ctx.response.status = code;
		ctx.response.body = {
			status: 'not authorized',
			loginHere: '/api/login?userName=&password=',
			registerHere: '/api/register?emailAddress=&password=',
			error,
		}
	}

	async save(ctx: Context) {
		// console.log('request', ctx.request);
		let body = ctx.request.body;
		// console.log('body', body);
		if (!body.destination) {
			throw new Error('destination is required');
		}
		if (!body.start_date) {
			throw new Error('start_date is required');
		}
		if (!(body.start_date as string).match(/\d{4}-\d{2}-\d{2}/)) {
			throw new Error('start_date format should be YYYY-MM-DD');
		}
		if (!body.end_date) {
			throw new Error('end_date is required');
		}
		if (!(body.end_date as string).match(/\d{4}-\d{2}-\d{2}/)) {
			throw new Error('end_date format should be YYYY-MM-DD');
		}

		// console.log('user', ctx.state.session.user);
		let trip = new Trip({
			...body,
			user: this.userID(ctx),
		});
		// console.log('trip', trip);
		ctx.response.body = {
			status: 'ok',
			trips: await this.service.save(trip),
		};
	}

	userID(ctx: Context) {
		return ctx.state.session.user.id;
	}

	async del(ctx: Context) {
		// console.log('request', ctx.request);
		let body = ctx.request.body;
		console.log('body', body);
		if (!body.id) {
			throw new Error('trip ID is required');
		}
		const tripID = body.id;

		const trip = await this.service.findById(tripID);
		if (!trip) {
			throw new Error('Trip not found');
		}
		if (trip.user !== this.userID(ctx)) {
			throw new Error('Access denied');
		}

		ctx.response.body = {
			status: 'ok',
			trips: await this.service.del(tripID),
		};
	}

	withTryCatch(method: Function) {
		return (ctx: Context) => {
			try {
				return method(ctx);
			} catch (e) {
				ctx.response.status = 500;
				ctx.response.body = {
					status: 'error',
					error: e.toString(),
				}
			}
		}
	}

}

export default new TripController();
