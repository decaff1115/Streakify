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
router.post('/register', userController.register);

//redirect signup to login para all that conbtroller for register does is insert user to database
//authtoken is only needed for login 
module.exports = router;
