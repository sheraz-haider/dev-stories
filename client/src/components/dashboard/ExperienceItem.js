import dayjs from 'dayjs';
import { useState } from 'react';
import PropTypes from 'prop-types';
import useStore from '../../hooks/useStore';
import { delExperience } from '../../store/actions/profile';

function ExperienceItem({ exp }) {
  const [loading, setLoading] = useState(false);

  const [, dispatch] = useStore();

  const delExp = id => {
    if (confirm('Are you sure to delete this?')) {
      setLoading(true);
      dispatch(delExperience(id));
    }
  };

  return (
    <tr>
      <td>{exp.company}</td>
      <td className='hide-sm'>{exp.title}</td>
      <td className='hide-sm'>
        {dayjs(exp.from).format('MMM DD, YYYY')} -{' '}
        {!exp.current ? dayjs(exp.to).format('MMM DD, YYYY') : 'Now'}
      </td>
      <td>
        <button
          className='btn btn-danger'
          onClick={() => delExp(exp._id)}
          disabled={loading}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

ExperienceItem.propTypes = {
  exp: PropTypes.object.isRequired,
};

export default ExperienceItem;
