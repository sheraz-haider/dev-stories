// Api Routes are not accecible via web for better security.
module.exports = function (req, res, next) {
  if (req.xhr) {
    next();
  } else {
    return res.status(404).send(`<pre>Cannot ${req.method} ${req.path}</pre>`);
  }
};
