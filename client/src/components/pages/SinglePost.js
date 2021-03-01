import { Fragment, useEffect } from 'react';
import useStore from '../../hooks/useStore';
import Spinner from '../layout/Spinner';
import { Link, useParams } from 'react-router-dom';
import { getSinglePost } from '../../store/actions/post';
import PostItem from '../posts/PostItem';
import CommentForm from '../post/CommentForm';

function SinglePost() {
  const { id } = useParams();

  const [
    {
      post: { post, loading },
    },
    dispatch,
  ] = useStore();

  useEffect(() => {
    dispatch(getSinglePost(id));
  }, []);

  if (loading || !post) {
    return <Spinner />;
  }

  return (
    <Fragment>
      <Link to='/posts' className='btn btn-light'>
        Back to Posts
      </Link>

      <PostItem post={post} showActions={false} />

      <CommentForm postId={post?._id} />
    </Fragment>
  );
}

export default SinglePost;
