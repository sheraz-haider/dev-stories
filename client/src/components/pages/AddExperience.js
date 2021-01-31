import { Fragment, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import useStore from '../../hooks/useStore';
import { addExperience } from '../../store/actions/profile';

function AddExperience() {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    from: '',
    current: false,
    to: '',
    description: '',
  });

  const [disableToDate, setDisableToDate] = useState(false);

  const [, dispatch] = useStore();

  const history = useHistory();

  const { title, company, location, from, current, to, description } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onCheckboxChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
    setDisableToDate(!disableToDate);
  };

  const onSubmit = e => {
    e.preventDefault();
    dispatch(addExperience(formData, history));
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Add An Experience</h1>
      <p className='lead'>
        <i className='fas fa-code-branch'></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Job Title'
            name='title'
            required
            onChange={onChange}
            value={title}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Company'
            name='company'
            required
            onChange={onChange}
            value={company}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Location'
            name='location'
            onChange={onChange}
            value={location}
          />
        </div>
        <div className='form-group'>
          <h4>* From Date</h4>
          <input type='date' name='from' onChange={onChange} value={from} />
        </div>
        <div className='form-group'>
          <p>
            <input
              id='current'
              type='checkbox'
              name='current'
              value={current}
              checked={current}
              onChange={onCheckboxChange}
              style={{ cursor: 'pointer' }}
            />{' '}
            <label htmlFor='current' style={{ cursor: 'pointer' }}>
              Current Job
            </label>
          </p>
        </div>
        {!disableToDate && (
          <div className='form-group'>
            <h4>To Date</h4>
            <input type='date' name='to' onChange={onChange} value={to} />
          </div>
        )}
        <div className='form-group'>
          <textarea
            name='description'
            cols='30'
            rows='5'
            placeholder='Job Description'
            onChange={onChange}
            value={description}
          ></textarea>
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
}

export default AddExperience;
