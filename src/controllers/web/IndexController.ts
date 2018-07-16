var proxy = require('http-proxy-middleware');
import { Controller, Get, UseAfter } from "routing-controllers";

@Controller()
export class WelcomeController {
  @Get("/")
  async mapIndex() {
    return ('Hello, map!');
  };
}