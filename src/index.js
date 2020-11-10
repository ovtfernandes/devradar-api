require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const routes = require('./routes');
const { setupWebsocket } = require('./websocket');

const app = express();
const server = http.Server(app);

setupWebsocket(server);

const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbClusterUrl = process.env.DB_CLUSTER_URL;
const dbName = process.env.DB_NAME;

const isSrv = dbUsername && dbPassword;
const dbURL = isSrv
    ? `${dbUsername}:${dbPassword}@${dbClusterUrl}`
    : dbClusterUrl;

const mongooseConnectionString = `mongodb${isSrv ? '+srv' : ''}://${dbURL}/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(mongooseConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3333;
server.listen(PORT);
