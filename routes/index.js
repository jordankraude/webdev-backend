const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/store', require('./store'))
router.use('/game', require('./game'))
router.use('/login', require('./login'))

module.exports = router;