const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/feedback');
const validate = require('../utilities/validator')


router.post('/', validate.validateReviewForm, contactsController.newReview);


module.exports = router;