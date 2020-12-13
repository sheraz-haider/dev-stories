const { Router } = require('express');
const router = Router();

router.get('*', (req, res) => {
  return res.status(200).send('Web Route Working');
});

module.exports = router;