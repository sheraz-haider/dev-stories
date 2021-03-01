import { Fragment, useEffect, useState } from 'react';
import useStore from '../../hooks/useStore';
import { addPost, getAllPosts } from '../../store/actions/post';
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';

function Posts() {
  const [
    {
      post: { posts, loading },
    },
    dispatch,
  ] = useStore();

  const [postText, setPostText] = useState('');

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Posts</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Welcome to the community!
      </p>

      <div className='post-form'>
        <div className='bg-primary p'>
          <h3>Say Something...</h3>
        </div>
        <form
          className='form my-1'
          onSubmit={e => {
            e.preventDefault();
            dispatch(addPost({ text: postText }));
            setPostText('');
          }}
        >
          <textarea
            name='text'
            cols='30'
            rows='5'
            placeholder='Create a post'
            required
            value={postText}
            onChange={e => setPostText(e.target.value)}
          />
          <input type='submit' className='btn btn-dark my-1' value='Submit' />
        </form>
      </div>

      <div className='posts'>
        {posts?.map(post => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </Fragment>
  );
}

export default Posts;
