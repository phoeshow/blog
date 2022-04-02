const express = require('express');
const paths = require('../config/paths');

const app = express();

app.use(express.static(paths.appBuild));

module.exports = app;
