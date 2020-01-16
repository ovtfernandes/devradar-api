const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('../config.json');
const routes = require('./routes');

const app = express();

const { dbUsername, dbPassword, dbClusterUrl, dbName } = config.database;
mongoose.connect(`mongodb+srv://${dbUsername}:${dbPassword}@${dbClusterUrl}/${dbName}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);