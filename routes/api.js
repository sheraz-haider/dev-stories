const { Router } = require('express');
const router = Router();
const AuthController = require('../app/Controllers/AuthController');
const XHRCheck = require('../app/Middlewares/XHRCheck');

router.use(XHRCheck);
router.get('/login', AuthController.login);
router.get('/register', AuthController.register);
router.get('/me', AuthController.getUser);

module.exports = router;