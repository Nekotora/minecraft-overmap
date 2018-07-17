var needle = require('needle')
let chalk = require('chalk')
const cheerio = require('cheerio')
import { Controller, Get, Req, Res } from "routing-controllers";

needle.defaults({
  open_timeout: 60000,
  user_agent: 'OverMap/1.2.3' 
});

@Controller()
export class WelcomeController {
  constructor(
  ){
    
  }

  @Get("/proxy/index.html")
  @Get("/proxy/")
  async mapIndex(
    @Req() req: any, 
    @Res() res: any
  ) {
    let reqUrl = req.originalUrl.replace('/proxy', '')
    let proxyUrl = 'https://overviewer.org/example'+reqUrl
    console.log(`${chalk.bgCyan.white(' Proxy ')} \n${req.originalUrl}\n${proxyUrl}`)
    try {
      var re = await needle('get', proxyUrl)
    }catch(error){  
      console.log(error)
      return error
    }
    console.log(re.body)
    res.set(re.headers);
    var $ = cheerio.load(re.body)
    var injectHtml = `
    <h1>Hello!</h1>
    `
    $('body').append(injectHtml)
    return $.html()
  };

  @Get("/proxy/*")
  async mapProxy(
    @Req() req: any, 
    @Res() res: any
  ) {
    let reqUrl = req.originalUrl.replace('/proxy', '')
    let proxyUrl = 'https://overviewer.org/example'+reqUrl
    console.log(`${chalk.bgCyan.white(' Proxy ')} \n${req.originalUrl}\n${proxyUrl}`)
    try {
      var re = await needle('get', proxyUrl)
    }catch(error){  
      console.log(error)
      return error
    }
    res.set(re.headers);
    return re.body
  };

}