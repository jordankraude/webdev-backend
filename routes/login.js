const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/login');

router.get('/',  contactsController.getAllUsers);
router.get('/:id',  contactsController.getUser);
router.post('/', contactsController.createNewUser);
router.put('/:id', contactsController.updateUser);
router.delete('/:id', contactsController.deleteUser);

module.exports = router;