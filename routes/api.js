const { Router } = require('express');
const router = Router();
const AuthController = require('../app/Controllers/AuthController');
const PostController = require('../app/Controllers/PostController');
const ProfileController = require('../app/Controllers/ProfileController');
const AuthMiddleware = require('../app/Middlewares/AuthMiddleware');

// User Routes
router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.get('/me', AuthMiddleware, AuthController.getUser);

// Profile Routes
router.get('/profile/all', ProfileController.getAllProfiles);
router.get('/profile/user/:user_id', ProfileController.getProfileByUser);
router.get('/profile/github/:username', ProfileController.getRepos);
router.use(AuthMiddleware);
router.post('/profile', ProfileController.setProfile);
router.get('/profile/me', ProfileController.getMyProfile);
router.delete('/profile', ProfileController.delMyProfile);
router.put('/profile/experience', ProfileController.addExperience);
router.delete('/profile/experience/:exp_id', ProfileController.delExperience);
router.put('/profile/education', ProfileController.addEducation);
router.delete('/profile/education/:edu_id', ProfileController.delEducation);

// Post Routes
router.post('/posts', PostController.createPost);
router.get('/posts', PostController.getAllPosts);
router.get('/posts/:id', PostController.getSinglePost);
router.delete('/posts/:id', PostController.delPost);
router.put('/posts/like/:id', PostController.likePost);
router.put('/posts/unlike/:id', PostController.unlikePost);
router.post('/posts/comment/:id', PostController.commentPost);
router.delete('/posts/comment/:id/:comment_id', PostController.delComment);

module.exports = router;
