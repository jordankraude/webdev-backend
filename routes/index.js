const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/quote-request', require('./quoteRequest'))
router.use('/feedback', require('./feedback'))

// router.use('/contact', require('./email'))

module.exports = router;