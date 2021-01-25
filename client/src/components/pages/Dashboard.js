import { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useStore from '../../hooks/useStore';
import { getCurrentProfile } from '../../store/actions/profile';
import Spinner from '../layout/Spinner';

function DashboardActions() {
  return (
    <div className='dash-buttons'>
      <Link to='edit-profile' className='btn btn-light'>
        <i className='fas fa-user-circle text-primary'></i> Edit Profile
      </Link>
      <Link to='add-experience' className='btn btn-light'>
        <i className='fab fa-black-tie text-primary'></i> Add Experience
      </Link>
      <Link to='add-education' className='btn btn-light'>
        <i className='fas fa-graduation-cap text-primary'></i> Add Education
      </Link>
    </div>
  );
}

function Dashboard() {
  const [
    {
      auth: { user },
      profile: { profile, loading },
    },
    dispatch,
  ] = useStore();

  useEffect(() => {
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
          <Fragment>
            <DashboardActions />
          </Fragment>
        ) : (
          <Fragment>
            <p>You have not yet setup a profile, Please add some info</p>
            <Link to='/create-profile' className='btn btn-primary my-1'>
              Create Profile
            </Link>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default Dashboard;
