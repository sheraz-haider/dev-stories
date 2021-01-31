import { Fragment } from 'react';
import PropTypes from 'prop-types';
import ExperienceItem from './ExperienceItem';

function ExperienceList({ experience }) {
  return (
    <Fragment>
      <h2 className='my-2'>Experience Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Company</th>
            <th className='hide-sm'>Title</th>
            <th className='hide-sm'>Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {experience.map(exp => (
            <ExperienceItem exp={exp} key={exp._id} />
          ))}
        </tbody>
      </table>
    </Fragment>
  );
}

ExperienceList.propTypes = {
  experience: PropTypes.array.isRequired,
};

export default ExperienceList;
