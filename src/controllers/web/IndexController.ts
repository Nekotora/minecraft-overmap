import { Controller, Get } from "routing-controllers";

@Controller()
export class WelcomeController {
  @Get("/")
  async mapIndex() {
    return ('Hello, map!');
  };
}