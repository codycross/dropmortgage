var formValidation = require('../../middleware/form.js');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var controller = require('./controller');

router.post('',formValidation.formValidation,controller.build)

module.exports = router;