import { Fragment, useEffect } from 'react';
import useStore from '../../hooks/useStore';
import { getProfiles } from '../../store/actions/profile';
import Spinner from '../layout/Spinner';
import ProfileItem from '../profiles/ProfileItem';

function Profiles() {
  const [
    {
      profile: { profiles, loading },
    },
    dispatch,
  ] = useStore();

  useEffect(() => {
    dispatch(getProfiles());
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Developers</h1>
      <p className='lead'>
        <i className='fab fa-connectdevelop'></i> Browse and connect with
        developers
      </p>
      <div className='profiles'>
        {profiles.length > 0 ? (
          profiles.map(profile => (
            <ProfileItem key={profile._id} profile={profile} />
          ))
        ) : (
          <h4>No Profiles found</h4>
        )}
      </div>
    </Fragment>
  );
}

export default Profiles;
