const { Router } = require('express');
const router = Router();
const AuthController = require('../app/Controllers/AuthController');
const ProfileController = require('../app/Controllers/ProfileController');
const AuthMiddleware = require('../app/Middlewares/AuthMiddleware');
const XHRCheck = require('../app/Middlewares/XHRCheck');

// will give 404 when accessed by browser
router.use(XHRCheck);

// User Routes
router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.get('/me', AuthMiddleware, AuthController.getUser);

// Profile Routes
router.post('/profile', AuthMiddleware, ProfileController.setProfile);
router.get('/profile/me', AuthMiddleware, ProfileController.getMyProfile);
router.get('/profile/all', ProfileController.getAllProfiles);
router.get('/profile/user/:user_id', ProfileController.getProfileByUser);
router.delete('/profile', AuthMiddleware, ProfileController.delMyProfile);
router.put(
  '/profile/experience',
  AuthMiddleware,
  ProfileController.addExperience
);
router.delete(
  '/profile/experience/:exp_id',
  AuthMiddleware,
  ProfileController.delExperience
);
router.put(
  '/profile/education',
  AuthMiddleware,
  ProfileController.addEducation
);
router.delete(
  '/profile/education/:edu_id',
  AuthMiddleware,
  ProfileController.delEducation
);

router.get('/profile/github/:username', ProfileController.getRepos);

module.exports = router;
