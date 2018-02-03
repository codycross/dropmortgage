
var express = require('express');
var router = express.Router();
// var report =  require('../modules/report');

router.use('/report',require('../modules/report/routes'));
// router.post('/report',report.validateForm, report.build);
// router.post('/report/test',report.validateForm, report.build);

router.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

module.exports = router;
