const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/quoteRequest');
const multer = require('multer');

// Configure multer for handling file uploads
const storage = multer.memoryStorage(); // Use memory storage for file buffer

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDFs and images (jpeg, jpg, png) are allowed.'), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

router.post('/', upload.single('file'), contactsController.newQuoteRequest);


module.exports = router;