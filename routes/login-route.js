const express = require('express');
const router = express.Router();
const{login}= require('../controller/login-controller');


router.post('/userlogin',login)

module.exports=router;