import Controller from '@curveball/controller';
import {Context} from '@curveball/core';
import {TripService} from './service';

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

}

export default new TripController();
