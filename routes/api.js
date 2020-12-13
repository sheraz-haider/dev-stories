const { Router } = require('express');
const router = Router();
const AuthController = require('../app/Controllers/AuthController');
const AuthMiddleware = require('../app/Middlewares/AuthMiddleware');
const XHRCheck = require('../app/Middlewares/XHRCheck');

router.use(XHRCheck);
router.post('/login', AuthController.login);
router.post('/register', AuthController.register);

router.use(AuthMiddleware);
router.get('/me', AuthController.getUser);

module.exports = router;