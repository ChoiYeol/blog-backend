
//esm 수정판 ->  import export 가능
require('dotenv').config();
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';

import api from './api';
/*
const Koa = require('koa');
const Router = require ('koa-router');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
*/
//비 구조화 할당을 통해 process.env 내부 값에 대한 레퍼런스 만들기
const {PORT , MONGO_URI} = process.env;

mongoose
.connect(MONGO_URI, {useNewUrlParser:true, useFindAndModify:false , useUnifiedTopology: true})
  .then(()=>{
    console.log('Connected to MongoDB');
  })
  .catch(e=>{
    console.error(e);
  });


const app = new Koa();
const router = new Router(); //라우터 설정


router.use('/api', api.routes());// api 라우터적용

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

const port = PORT || 4000;
app.listen(port, ()=>{
  console.log('Listening to port %d',port);
});