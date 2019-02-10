const keys = require('./keys');

// Express Setup
const express = require('express');
const bodyParser =  require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Postgres Client Setup
const { Pool } = require('pg');
const pgClient = new Pool({
    user: keys.pgUser,
    password: keys.pgPassword,
    database: keys.pgDatabase,
    host: keys.pgHost,
    port: keys.pgPort
});
pgClient.on('error', () => console.log('Postgres Connection Error'));

pgClient
    .query('CREATE TABLE IF NOT EXISTS values (number INT)')
    .catch(err => console.log(err));

// Redis Client Setup
const redis = require('redis');
const redisCLient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000
});

const redisPublisher = redisCLient.duplicate();
