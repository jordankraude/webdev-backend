const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/feedback');


router.post('/', contactsController.newReview);


module.exports = router;