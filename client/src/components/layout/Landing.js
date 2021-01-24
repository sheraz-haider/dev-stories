import { Link, Redirect } from 'react-router-dom';
import useStore from '../../hooks/useStore';

function Landing() {
  const [
    {
      auth: { isLoggedIn },
    },
  ] = useStore();

  if (isLoggedIn) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Developer Stories</h1>
          <p className='lead'>
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>
          <div className='buttons'>
            <Link to='/register' className='btn btn-primary'>
              Sign Up
            </Link>
            <Link to='/login' className='btn btn-light'>
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Landing;
