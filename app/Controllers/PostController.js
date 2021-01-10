const Validator = require('validatorjs');
const Post = require('../Models/Post');
const User = require('../Models/User');

module.exports = {
  async createPost(req, res) {
    const validation = new Validator(res.body, {
      text: 'required|string',
    });

    if (validation.fails()) {
      return res.status(400).json(validation.errors);
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const post = await newPost.save();

      return res.json(post);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  },

  async getAllPosts(req, res) {
    try {
      const posts = await Post.find().sort({ date: -1 });
      return res.json(posts);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  },

  async getSinglePost(req, res) {
    try {
      const post = await Post.findById(req.params.id);

      // Check for ObjectId format and post
      if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !post) {
        return res.status(404).json({ errors: { post: 'Post not found' } });
      }

      return res.json(post);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  },

  async delPost(req, res) {
    try {
      const post = await Post.findById(req.params.id);

      // Check for ObjectId format and post
      if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !post) {
        return res.status(404).json({ errors: { post: 'Post not found' } });
      }

      // Check user
      if (post.user.toString() !== req.user.id) {
        return res
          .status(401)
          .json({ errors: { user: 'User not authorized' } });
      }

      await post.remove();

      return res.json({ msg: 'Post removed' });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  },

  async likePost(req, res) {
    try {
      const post = await Post.findById(req.params.id);

      // Check if the post has already been liked
      const found = post.likes.filter(
        like => like.user.toString() === req.user.id
      );
      if (found.length > 0) {
        return res.status(400).json({ errors: { like: 'Post already liked' } });
      }

      post.likes.unshift({ user: req.user.id });

      await post.save();

      return res.json(post.likes);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  },

  async unlikePost(req, res) {
    try {
      const post = await Post.findById(req.params.id);

      // Check if the post has already been liked
      const found = post.likes.filter(
        like => like.user.toString() === req.user.id
      );
      if (found.length === 0) {
        return res
          .status(400)
          .json({ errors: { unlike: 'Post has not been liked yet' } });
      }

      // Get remove index
      const removeIndex = post.likes
        .map(like => like.user.toString())
        .indexOf(req.user.id);

      post.likes.splice(removeIndex, 1);

      await post.save();

      return res.json(post.likes);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  },

  async commentPost(req, res) {
    const validation = new Validator(res.body, {
      text: 'required|string',
    });

    if (validation.fails()) {
      return res.status(400).json(validation.errors);
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      post.comments.unshift(newComment);

      await post.save();

      return res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  },

  async delComment(req, res) {
    try {
      const post = await Post.findById(req.params.id);

      // Pull out comment
      const comment = post.comments.find(
        comment => comment.id === req.params.comment_id
      );

      // Make sure comment exists
      if (!comment) {
        return res
          .status(404)
          .json({ errors: { comment: 'Comment does not exist' } });
      }

      // Check user
      if (comment.user.toString() !== req.user.id) {
        return res
          .status(401)
          .json({ errors: { user: 'User not authorized' } });
      }

      // Get remove index
      const removeIndex = post.comments
        .map(comment => comment.id)
        .indexOf(req.params.comment_id);

      post.comments.splice(removeIndex, 1);

      await post.save();

      return res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  },
};
