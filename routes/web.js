/* global __dirname */
const path = require('path');
const { Router } = require('express');
const router = Router();

router.get('*', (req, res) => {
  return res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

module.exports = router;