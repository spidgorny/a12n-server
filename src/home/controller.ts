import { Controller, accept, method } from '@curveball/controller';
import { Context } from '@curveball/core';
import hal from './formats/hal';
import markdown from './formats/markdown';

class HomeController extends Controller {

  @accept('text/markdown')
  @method('GET')
  getMarkdown(ctx: Context) {

    const version = require('../../package.json').version;
    ctx.response.body = markdown(version, ctx.state.user);
    ctx.response.headers.set('Content-Type', 'text/markdown');

  }

  @accept('application/json')
  @method('GET')
  getJson(ctx: Context) {

    const version = require('../../package.json').version;
    ctx.response.body = hal(version, ctx.state.user);

  }

}

export default new HomeController();
