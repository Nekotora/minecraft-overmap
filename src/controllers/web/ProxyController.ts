var needle = require('needle')
let chalk = require('chalk')
const cheerio = require('cheerio')
import { Controller, Get, Req, Res } from "routing-controllers";

needle.defaults({
  open_timeout: 60000,
  response_timeout: 120000,
  user_agent: 'OverMap/0.0.0' 
});

@Controller()
export class WelcomeController {
  constructor(
  ){
  }

  private async proxyUrl(reqUrl: string){
    let proxyTarget = 'https://overviewer.org/example/'
    let proxyUrl =  proxyTarget + reqUrl.replace('/proxy/', '')
    console.log(`${chalk.bgGreen.white(' Proxy ')} \n${reqUrl}\n${proxyUrl}`)
    return proxyUrl
  }

  /**  
   * Inject with Overviewer Map Index
  */
  @Get("/proxy/index.html")
  @Get("/proxy/")
  async mapIndex(
    @Req() req: any, 
    @Res() res: any
  ) {
    try {
      var re = await needle('get', this.proxyUrl(req.original))
    }catch(error){
      return error
    }
    res.set(re.headers);
    // Injecion
    var $ = cheerio.load(re.body)
    var injectHtml = `
      <h1>Hello!</h1>
    `
    $('body').append(injectHtml)
    return $.html()
  };

  /**  
   * Inject with Overviewer Map Index
  */
  @Get("/proxy/*")
  async mapProxy(
    @Req() req: any, 
    @Res() res: any
  ) {
    try {
      var re = await needle('get', this.proxyUrl(req.original))
    }catch(error){  
      return error
    }
    res.set(re.headers);
    return re.body
  };

}