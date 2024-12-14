const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');



//dont forget to add for login and register !

router.post('/login', userController.login);
router.post('/register', userController.register);

//redirect signup to login para all that conbtroller for register does is insert user to database
//authtoken is only needed for login 
module.exports = router;

