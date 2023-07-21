const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/graphicDesigns');
const multer = require('multer');

// Configure multer to handle the file upload
const upload = multer({ dest: 'uploads/' })

router.get('/',  contactsController.getAllGraphics);
router.get('/:id',  contactsController.getGraphic);
router.post('/', upload.single('pdfFile'), contactsController.createNewGraphic);
router.put('/:id', contactsController.updateGraphic);
router.delete('/:id', contactsController.deleteGraphic);

module.exports = router;