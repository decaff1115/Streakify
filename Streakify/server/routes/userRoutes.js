const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/*
router.get('/', userController.getAllUsers);

router.get('/:id', userController.getUserById);

router.post('/', userController.createUser);

router.put('/:id', userController.updateUser);

router.delete('/:id', userController.deleteUser);
*/

//dont forget to add for login and register !

router.post('/login', userController.login);

module.exports = router;

