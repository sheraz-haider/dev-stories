import { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useStore from '../../hooks/useStore';
import { delAccount, getCurrentProfile } from '../../store/actions/profile';
import Spinner from '../layout/Spinner';
import DashboardActions from '../dashboard/DashboardActions';
import ExperienceList from '../dashboard/ExperienceList';
import EducationList from '../dashboard/EducationList';

function Dashboard() {
  const [
    {
      auth: { user },
      profile: { profile, loading },
    },
    dispatch,
  ] = useStore();

  useEffect(() => {
    if (!profile) {
      dispatch(getCurrentProfile());
    }
  }, []);

  const delAcc = () => {
    if (confirm("Are you sure? this can't be undone!")) {
      dispatch(delAccount());
    }
  };

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

            {profile.experience.length > 0 && (
              <ExperienceList experience={profile.experience} />
            )}

            {profile.education.length > 0 && (
              <EducationList education={profile.education} />
            )}

            <div className='my-2'>
              <button className='btn btn-danger' onClick={delAcc}>
                <i className='fas fa-user-minus'></i> Delete My Account
              </button>
            </div>
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
