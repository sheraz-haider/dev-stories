import { Fragment } from 'react';
import PropTypes from 'prop-types';

function SingleProfileAbout({ profile }) {
  const {
    user: { name },
    bio,
    skills,
  } = profile;

  return (
    <div className='profile-about bg-light p-2'>
      {bio && (
        <Fragment>
          <h2 className='text-primary'>
            {name?.trim().split(' ')[0]}&#8217;s Bio
          </h2>
          <p>{bio}</p>
          <div className='line'></div>
        </Fragment>
      )}

      {skills.length > 0 && (
        <Fragment>
          <h2 className='text-primary'>Skill Set</h2>
          <div className='skills'>
            {skills.map((skill, index) => (
              <div className='p-1' key={index}>
                <i className='fa fa-check'></i> {skill}
              </div>
            ))}
          </div>
        </Fragment>
      )}
    </div>
  );
}

SingleProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default SingleProfileAbout;
