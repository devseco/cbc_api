const express = require('express');
const router = express.Router();

const router_cbc = require('../CBC/routes/Router');
const router_aqa = require('../AQS/routes/Router');

// CBC routes
router.use('/cbc', router_cbc);

// AQA routes
router.use('/aqa', router_aqa);

module.exports = router;