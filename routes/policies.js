var express = require('express');
var router = express.Router();

var policies = require('../controllers/policies/policiesController');

router.get('/user/', policies.getClientByPolicy);

router.get('/details/', policies.getClientPolicyDetail);

module.exports = router;