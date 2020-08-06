const { Router } = require('express');
const router = Router();

const  {
    renderSignUpForm,
    renderSigninForm,
    signup,
    logout,
    signin
} = require('../controllers/users.controller');


router.get('/users/signup', renderSignUpForm);
router.post('/users/singup', signup);
router.get('/users/signin' , renderSigninForm);
router.post('/users/signin' ,signin);
router.get('/users/logout', logout);

module.exports = router;
