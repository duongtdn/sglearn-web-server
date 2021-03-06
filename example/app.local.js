"use strict"

require('dotenv').config()

const api = require('../dist/api')

/* create api */
const DatabaseAbstractor = require("database-abstractor")
const catalog = new DatabaseAbstractor();
const course = new DatabaseAbstractor();
const enroll = new DatabaseAbstractor();

const DB = {
  HOST: process.env.DB_HOST || 'http://localhost',
  PORT: process.env.DB_PORT || 3001
}

catalog.use(require('catalogdb-dynamodb-driver')({
  region : 'us-west-2', 
  endpoint : `${DB.HOST}:${DB.PORT}`
}))

course.use(require('coursedb-dynamodb-driver')({
  region : 'us-west-2', 
  endpoint : `${DB.HOST}:${DB.PORT}`
}))

enroll.use(require('enrolldb-dynamodb-driver')({
  region : 'us-west-2', 
  endpoint : `${DB.HOST}:${DB.PORT}`
}))

api.useDatabase({ catalog, course, enroll })

/* create express app from api */
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express();

app.use(cors());
app.use(cookieParser())

app.use('/', api);

module.exports = app;