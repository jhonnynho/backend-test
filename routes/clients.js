var express = require('express');
var router = express.Router();

var clients = require('../controllers/clients/clientsController');

router.get('/', clients.getClient);

module.exports = router;
