/* global process */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const Validator = require('validatorjs');
const User = require('../Models/User');

const self = (module.exports = {
  async register(req, res) {

    const validation = new Validator(req.body, {
      name: 'required|max:255|string',
      email: 'required|email',
      password: 'required|min:8',
    });

    if (validation.fails()) {
      return res.status(400).json(validation.errors);
    }

    const found = await User.exists({ email: req.body.email });
    if (found) {
      return res
        .status(400)
        .json({ errors: { email: ['Email already exists.'] } });
    }

    const avatar = gravatar.url(req.body.email, {
      s: '150',
      r: 'pg',
      d: '404',
    });

    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password,
      avatar,
    });
    let user = (await newUser.save())._doc;
    delete user.password;

    const token = self.createToken(user);

    return res.json({ token, user });
  },

  async login(req, res) {
    const validation = new Validator(req.body, {
      email: 'required',
      password: 'required',
    });

    if (validation.fails()) {
      return res.status(400).json(validation.errors);
    }

    const found = await User.findOne({ email: req.body.email })
      .select('_id name email password created_at')
      .exec();
    if (!found) {
      return res
        .status(400)
        .json({ errors: { email: ['Invalid Email and/or Password'] } });
    }

    const compare = bcrypt.compareSync(req.body.password, found.password);
    if (!compare) {
      return res
        .status(400)
        .json({ errors: { email: ['Invalid Email and/or Password'] } });
    }

    let user = found._doc;
    delete user.password;

    const token = self.createToken(user);

    return res.json({ token, user });
  },

  getUser(req, res) {},

  createToken(user) {
    return jwt.sign(
      {
        _id: user._id,
        created_at: user.created_at,
      },
      process.env.APP_KEY,
      { expiresIn: 60 * 60 * 24 * 7 } // 7 days
    );
  },
});
