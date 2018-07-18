var needle = require('needle')
let chalk = require('chalk')
const cheerio = require('cheerio')
const fs = require("fs");
import * as path from 'path';
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

  private proxyUrl(reqUrl: string){
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
      var re = await needle('get', this.proxyUrl(req.originalUrl))
      // Injecion
      var $ = cheerio.load(re.body)
    //   var injectHtml = `
    //   <div class="overmap_main" id="overmap"></div>
    //   <script src="/public/index.js"></script>
    //   <!--  OverMap Injecion  -->
    // `
      let injectHtml:string = fs.readFileSync(path.resolve(__dirname, '../../../public/index.html'), "utf-8");
      $('body').append(injectHtml)
      res.set(re.headers);
      console.log($.html())
      return $.html()
    } catch (error) {
      console.log(`${chalk.bgRed.white(' Proxy ')} ERROR`,error)
      return error
    }
    
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
      var re = await needle('get', this.proxyUrl(req.originalUrl))
      await res.set(re.headers);
      return re.body
    } catch (error) {  
      console.log(`${chalk.bgRed.white(' Proxy ')} ERROR`,error)
      return error
    }
    
  };

}