import express from 'express';
import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { Sequelize } from 'sequelize-typescript';
import * as path from 'path';
let chalk = require('chalk')
import "reflect-metadata";
import { createExpressServer } from "routing-controllers";
import { proxy } from "../proxies/Overviewer"

const app = createExpressServer({
  controllers: [
    path.resolve(__dirname, "../controllers/**/*Controller.js"),
  ]
});
const port: number = Number(process.env.PORT) || 3000;

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: "localhost",
  database: 'overmap',
  username: 'root',
  password: '11111111',
  modelPaths: [path.join(__dirname, '..', '/models')]
});

sequelize
  .sync({force: true})
  //.sync({alter:true})
  .then(() => {
    app.locals.sequelizeSync = true
    console.log(`${chalk.bgCyan.white(' Database ')} sequelize sync success`)
    app.emit('sequelizeSync')
  })
  .catch((err) => {
    console.log('An error occurred while synchronizing the table: ', err)
  })


app.use('/assets', express.static(path.resolve(__dirname, '../../assets')))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/p', proxy);


app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});