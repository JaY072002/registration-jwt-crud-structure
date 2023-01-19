const router = require('express').Router();
const { renderUserRegister, registerUser, renderUserLogin, loginUser } = require('../controllers/auth');

// /auth

// /register
router.get('/register', renderUserRegister); //user register page

router.post('/register', registerUser);  //user register 


// /login
router.get('/login', renderUserLogin);  //user login page

router.post('/login', loginUser); //user login 


module.exports = router;