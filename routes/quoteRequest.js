const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/quoteRequest');
const multer = require('multer');


const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDFs and images (jpeg, jpg, png) are allowed.'), false);
  }
};

const upload = multer();

router.post('/', upload.single('file'), contactsController.newQuoteRequest);


module.exports = router;