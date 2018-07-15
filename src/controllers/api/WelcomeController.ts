import { Controller, Get } from "routing-controllers";

@Controller()
export class WelcomeController {
  @Get("/hello")
  async hello() {
    return('Hello, World!');
  };
}