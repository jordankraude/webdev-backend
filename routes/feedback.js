const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/feedback');
const validate = require('../utilities/validator')

router.post('/', express.urlencoded({ extended: true }), validate.validateReviewForm, contactsController.newReview);



module.exports = router;