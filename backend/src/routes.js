const express = require('express');
const OngController = require('./controller/OngController');
const CasosController = require('./controller/CasosController');
const ProfileController = require('./controller/ProfileController');
const SessionController = require('./controller/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);
  
routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/profile', ProfileController.index);

routes.get('/casos', CasosController.index);
routes.post('/casos', CasosController.create);
routes.delete('/casos/:id',CasosController.delete);

module.exports = routes;