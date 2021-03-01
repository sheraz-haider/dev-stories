import PropTypes from 'prop-types';
import useStore from '../../hooks/useStore';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { addLike, deletePost, removeLike } from '../../store/actions/post';
import { Fragment } from 'react';

function PostItem({ post, showActions }) {
  const [{ auth }, dispatch] = useStore();

  const { _id, text, name, avatar, user, likes, comments, date } = post;

  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${user}`}>
          <img className='round-img' src={avatar} alt={name} />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>{text}</p>
        <p className='post-date'>
          Posted on {dayjs(date).format('YYYY/MM/DD')}
        </p>
        {showActions && (
          <Fragment>
            <button
              onClick={() => dispatch(addLike(_id))}
              className='btn btn-light'
            >
              <i className='fas fa-thumbs-up'></i>
              {likes.length > 0 && <span> {likes.length}</span>}
            </button>
            <button
              onClick={() => dispatch(removeLike(_id))}
              className='btn btn-light'
            >
              <i className='fas fa-thumbs-down'></i>
            </button>
            <Link to={`/posts/${_id}`} className='btn btn-primary'>
              Discussion{' '}
              {comments.length > 0 && (
                <span className='comment-count'>{comments.length}</span>
              )}
            </Link>
            {user === auth.user._id && (
              <button
                type='button'
                className='btn btn-danger'
                onClick={() => dispatch(deletePost(_id))}
              >
                <i className='fas fa-times'></i>
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
}

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  showActions: PropTypes.bool.isRequired,
};

export default PostItem;
