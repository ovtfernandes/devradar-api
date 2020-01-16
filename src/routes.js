const { Router } = require('express');

const devController = require('./controllers/devController');

const routes = Router();

routes.post('/devs', devController.store);
routes.get('/devs', devController.index);

module.exports = routes;