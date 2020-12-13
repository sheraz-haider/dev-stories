const { Router } = require("express");
const router = Router();

const webRoutes = require('./web');
const apiRoutes = require('./api');

router.use('/api', apiRoutes);
router.use(webRoutes);

module.exports = router;

