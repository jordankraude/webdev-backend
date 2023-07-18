const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/game');

router.get('/',  contactsController.getAllGames);
router.get('/:id',  contactsController.getGame);
router.post('/', contactsController.createNewGame);
router.put('/:id', contactsController.updateGame);
router.delete('/:id', contactsController.deleteGame);

module.exports = router;