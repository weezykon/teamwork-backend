// imports
const express = require('express');
const { Client } = require('pg');
const app = express();

// connection
const db = "postgres://weezykonlocal:root@localhost/teamwork";
const client = new Client({
    connectionString: db
});
client.connect();

// extracts the JSON object from the request
const bodyParser = require('body-parser');

// cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Using body parser
app.use(bodyParser.json());

module.exports = app;