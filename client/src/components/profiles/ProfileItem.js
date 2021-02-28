import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function ProfileItem({ profile }) {
  const {
    user: { _id, name, avatar },
    status,
    company,
    skills,
    location,
  } = profile;

  return (
    <div className='profile bg-light'>
      <img className='round-img' src={avatar} alt={name} />
      <div>
        <h2>{name}</h2>
        <p>
          {status} {company && <span>at {company}</span>}
        </p>
        <p>{location}</p>
        <Link to={`profile/${_id}`} className='btn btn-primary'>
          View Profile
        </Link>
      </div>

      {skills.length > 0 && (
        <ul>
          {skills.slice(0, 4).map((skill, index) => (
            <li className='text-primary' key={index}>
              <i className='fas fa-check'></i> {skill}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
