var express = require('express');
var router = express.Router();

var HandlerGenerator = require("../handlegenerator.js");
var middleware = require("../middleware.js");
const {connect} = require('../db');
const { ROLE } = require('../Roles.js');
connect();

HandlerGenerator = new HandlerGenerator();

/* GET home page. */
router.get('/', middleware.checkToken, HandlerGenerator.index);
router.get('/admin', middleware.checkToken, middleware.checkRole(ROLE.ADMIN), HandlerGenerator.index);
router.get('/mantain', middleware.checkToken, middleware.checkRole(ROLE.MANAGER), HandlerGenerator.index);
router.post( '/login', HandlerGenerator.login);
router.post('/register', middleware.checkToken, middleware.checkRole(ROLE.ADMIN), HandlerGenerator.register);

module.exports = router;