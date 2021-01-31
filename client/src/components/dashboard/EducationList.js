import PropTypes from 'prop-types';
import { Fragment } from 'react';
import EducationItem from './EducationItem';

function EducationList({ education }) {
  return (
    <Fragment>
      <h2 className='my-2'>Education Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>School</th>
            <th className='hide-sm'>Degree</th>
            <th className='hide-sm'>Years</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {education.map(edu => (
            <EducationItem edu={edu} key={edu._id} />
          ))}
        </tbody>
      </table>
    </Fragment>
  );
}

EducationList.propTypes = {
  education: PropTypes.array.isRequired,
};

export default EducationList;
