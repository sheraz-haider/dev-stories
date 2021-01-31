import { useState } from 'react';
import useStore from '../../hooks/useStore';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { delEducation } from '../../store/actions/profile';

function EducationItem({ edu }) {
  const [loading, setLoading] = useState(false);

  const [, dispatch] = useStore();

  const delEdu = id => {
    if (confirm('Are you sure to delete this?')) {
      setLoading(true);
      dispatch(delEducation(id));
    }
  };

  return (
    <tr>
      <td>{edu.school}</td>
      <td className='hide-sm'>{edu.degree}</td>
      <td className='hide-sm'>
        {dayjs(edu.from).format('MMM DD, YYYY')} -{' '}
        {!edu.current ? dayjs(edu.to).format('MMM DD, YYYY') : 'Now'}
      </td>
      <td>
        <button
          className='btn btn-danger'
          onClick={() => delEdu(edu._id)}
          disabled={loading}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

EducationItem.propTypes = {
  edu: PropTypes.object.isRequired,
};

export default EducationItem;
