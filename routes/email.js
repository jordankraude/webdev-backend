const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/email');

router.post('/', contactsController.sendEmailUsingOAuth);

module.exports = router;