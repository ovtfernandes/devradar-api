const express = require('express');
const mongoose = require('mongoose');
const config = require('../config.json');

const app = express();

const { dbUsername, dbPassword, dbClusterUrl, dbName } = config.database;
mongoose.connect(`mongodb+srv://${dbUsername}:${dbPassword}@${dbClusterUrl}/${dbName}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(express.json());

app.listen(3333);