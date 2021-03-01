import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

function SingleProfileExp({ exp }) {
  const { company, from, to, current, title, description } = exp;

  return (
    <div>
      <h3 className='text-dark'>{company}</h3>
      <p>
        {dayjs(from).format('MM YYYY')} -{' '}
        {current ? 'Now' : dayjs(to).format('MM YYYY')}
      </p>
      <p>
        <strong>Position: </strong>
        {title}
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

SingleProfileExp.propTypes = {
  exp: PropTypes.object.isRequired,
};

export default SingleProfileExp;
