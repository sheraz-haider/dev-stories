const axios = require('axios');
const Validator = require('validatorjs');
const Post = require('../Models/Post');
const Profile = require('../Models/Profile');
const User = require('../Models/User');

module.exports = {
  async getMyProfile(req, res) {
    try {
      const profile = await Profile.findOne({
        user: req.body.id,
      }).populate('user', ['name', 'avatar']);

      if (!profile) {
        return res
          .status(400)
          .json({ errors: { profile: 'Profile not found' } });
      }

      return res.json(profile);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ errors: { server: 'Server Error' } });
    }
  },

  async setProfile(req, res) {
    const validation = new Validator(req.body, {
      status: 'required|string',
      skills: 'required|string',
    });

    if (validation.fails()) {
      return res.status(400).json(validation.errors);
    }

    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(',').map(skill => skill.trim());
    }

    // Build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      // Using upsert option (creates new doc if no match is found):
      let profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true }
      );

      return res.json(profile);
    } catch (err) {
      console.error(err);
      return res.status(500).send({ errors: { server: 'Server Error' } });
    }
  },

  async getAllProfiles(req, res) {
    try {
      const profiles = await Profile.find().populate('user', [
        'name',
        'avatar',
      ]);
      return res.json(profiles);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ errors: { server: 'Server Error' } });
    }
  },

  async getProfileByUser(req, res) {
    try {
      const profile = await Profile.findOne({
        user: req.params.user_id,
      }).populate('user', ['name', 'avatar']);

      if (!profile)
        return res
          .status(400)
          .json({ errors: { profile: 'Profile not found' } });

      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      if (err.kind == 'ObjectId') {
        return res
          .status(400)
          .json({ errors: { profile: 'Profile not found' } });
      }

      return res.status(500).send('Server Error');
    }
  },

  async delMyProfile(req, res) {
    try {
      // Remove user posts
      await Post.deleteMany({ user: req.user.id });
      // Remove profile
      await Profile.findOneAndRemove({ user: req.user.id });
      // Remove user
      await User.findOneAndRemove({ _id: req.user.id });

      return res.json({ msg: 'User deleted' });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  },

  async addExperience(req, res) {
    const validation = new Validator(req.body, {
      title: 'required|string',
      company: 'required|string',
      form: 'required|string',
    });

    if (validation.fails()) {
      return res.status(400).json(validation.errors);
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.experience.unshift(newExp);

      await profile.save();

      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  },

  async delExperience(req, res) {
    try {
      const profile = await Profile.findOne({ user: req.user.id });

      // Get remove index
      const removeIndex = profile.experience
        .map(item => item.id)
        .indexOf(req.params.exp_id);

      profile.experience.splice(removeIndex, 1);

      await profile.save();

      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  },

  async addEducation(req, res) {
    const validation = new Validator(req.body, {
      school: 'required|string',
      degree: 'required|string',
      fieldofstudy: 'required|string',
      form: 'required|string',
    });

    if (validation.fails()) {
      return res.status(400).json(validation.errors);
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.education.unshift(newEdu);

      await profile.save();

      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  },

  async delEducation(req, res) {
    try {
      const profile = await Profile.findOne({ user: req.user.id });

      // Get remove index
      const removeIndex = profile.education
        .map(item => item.id)
        .indexOf(req.params.edu_id);

      profile.education.splice(removeIndex, 1);

      await profile.save();

      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  },

  async getRepos(req, res) {
    try {
      const response = axios({
        uri: encodeURI(
          `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
        ),
        method: 'GET',
        headers: {
          'user-agent': 'node.js',
        },
      });

      return res.json(response.data);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send({ errors: { server: [err] } });
    }
  },
};
