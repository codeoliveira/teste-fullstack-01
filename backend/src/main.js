const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const jwt = require('jsonwebtoken');

const app = express();

const cfg = require('./config/main.config');
const routes = require('./routes/main.routes');
const mongoDBConnect = require('./common/database/mongodb.conn');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(routes);



app.listen(cfg.server.port, cfg.server.host || '127.0.0.1', () => {
    console.log(`
==========================================
Backend started on port ${cfg.server.port}`);
    mongoDBConnect();
});

