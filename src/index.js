const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const config = require('../config.json');
const routes = require('./routes');
const { setupWebsocket } = require('./websocket');

const app = express();
const server = http.Server(app);

setupWebsocket(server);

const { dbUsername, dbPassword, dbClusterUrl, dbName } = config.database;
mongoose.connect(`mongodb+srv://${dbUsername}:${dbPassword}@${dbClusterUrl}/${dbName}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);