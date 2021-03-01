import PropTypes from 'prop-types';
import dayjs from 'dayjs';

function SingleProfileEdu({ edu }) {
  const { school, degree, fieldofstudy, from, to, current, description } = edu;

  return (
    <div>
      <h3>{school}</h3>
      <p>
        {dayjs(from).format('MM YYYY')} -{' '}
        {current ? 'Now' : dayjs(to).format('MM YYYY')}
      </p>
      <p>
        <strong>Degree: </strong>
        {degree}
      </p>
      <p>
        <strong>Field Of Study: </strong>
        {fieldofstudy}
      </p>
      {description && (
        <p>
          <strong>Description: </strong>
          {description}
        </p>
      )}
    </div>
  );
}

SingleProfileEdu.propTypes = {
  edu: PropTypes.object.isRequired,
};

export default SingleProfileEdu;
