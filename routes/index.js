const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/graphicDesign', require('./graphicDesigns'))
router.use('/store', require('./store'))
router.use('/game', require('./game'))
router.use('/login', require('./login'))
// router.use('/contact', require('./email'))

module.exports = router;