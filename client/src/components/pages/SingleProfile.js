import { Fragment, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useStore from '../../hooks/useStore';
import { getProfileById } from '../../store/actions/profile';
import Spinner from '../layout/Spinner';
import SingleProfileAbout from '../profiles/SingleProfileAbout';
import SingleProfileEdu from '../profiles/SingleProfileEdu';
import SingleProfileExp from '../profiles/SingleProfileExp';
import SingleProfileHeader from '../profiles/SingleProfileHeader';
import SingleProfileRepos from '../profiles/SingleProfileRepos';

function SingleProfile() {
  const { id: userId } = useParams();

  const [
    {
      profile: { profile },
      auth: { user, isLoggedIn },
    },
    dispatch,
  ] = useStore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getProfileById(userId, setLoading));
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Fragment>
      <Link to='/profiles' className='btn btn-light'>
        Back To Profiles
      </Link>

      {isLoggedIn && userId == user._id && (
        <Link to='/edit-profile' className='btn btn-dark'>
          Edit Profile
        </Link>
      )}

      <div className='profile-grid my-1'>
        <SingleProfileHeader profile={profile} />

        <SingleProfileAbout profile={profile} />

        {/* Experiences */}
        <div className='profile-exp bg-white p-2'>
          <h2 className='text-primary'>Experience</h2>

          {profile.experience.length > 0 ? (
            profile.experience.map(exp => (
              <SingleProfileExp key={exp._id} exp={exp} />
            ))
          ) : (
            <h4>No experience credentials found</h4>
          )}
        </div>

        {/* Education */}
        <div className='profile-edu bg-white p-2'>
          <h2 className='text-primary'>Education</h2>

          {profile.education.length > 0 ? (
            profile.education.map(edu => (
              <SingleProfileEdu key={edu._id} edu={edu} />
            ))
          ) : (
            <h4>No education credentials found.</h4>
          )}
        </div>

        {profile.githubusername && (
          <SingleProfileRepos username={profile.githubusername} />
        )}
      </div>
    </Fragment>
  );
}

export default SingleProfile;
