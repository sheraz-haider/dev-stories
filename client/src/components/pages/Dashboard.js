import { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useStore from '../../hooks/useStore';
import { getCurrentProfile } from '../../store/actions/profile';
import Spinner from '../layout/Spinner';

function Dashboard() {
  const [
    {
      auth: { user },
      profile: { profile, loading },
    },
    dispatch,
  ] = useStore();

  useEffect(() => {
    console.log('runs profile api route');
    dispatch(getCurrentProfile());
  }, []);

  if (loading && profile === null) {
    return <Spinner />;
  } else {
    return (
      <Fragment>
        <h1 className='large text-primary'>Dashboard</h1>
        <p className='lead'>
          <i className='fas fa-user' /> Welcome {user && user.name}
        </p>

        {profile ? (
          <Fragment>TODO: display profile here</Fragment>
        ) : (
          <Fragment>
            <p>You have not yet setup a profile, Please add some info</p>
            <Link to="/create-profile" className='btn btn-primary my-1'>
              Create Profile
            </Link>
          </Fragment>
        )}
      </Fragment>
    );
  }

  // return <div>Dashboard...Profile Loaded</div>;
}

export default Dashboard;
