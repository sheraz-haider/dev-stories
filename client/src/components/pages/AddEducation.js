import { Fragment, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import useStore from '../../hooks/useStore';
import { addEducation } from '../../store/actions/profile';

function AddEducation() {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    current: false,
    to: '',
    description: '',
  });

  const [disableToDate, setDisableToDate] = useState(false);

  const [, dispatch] = useStore();

  const history = useHistory();

  const {
    school,
    degree,
    fieldofstudy,
    from,
    current,
    to,
    description,
  } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onCheckboxChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
    setDisableToDate(!disableToDate);
  };

  const onSubmit = e => {
    e.preventDefault();
    dispatch(addEducation(formData, history));
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Add Your Education</h1>
      <p className='lead'>
        <i className='fas fa-graduation-cap'></i> Add any school, bootcamp, etc
        that you have attended
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* School or Bootcamp'
            name='school'
            required
            value={school}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Degree or Certificate'
            name='degree'
            required
            value={degree}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Field Of Study'
            name='fieldofstudy'
            value={fieldofstudy}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <h4>From Date</h4>
          <input type='date' name='from' value={from} onChange={onChange} />
        </div>
        <div className='form-group'>
          <p>
            <input
              type='checkbox'
              name='current'
              id='current'
              value={current}
              checked={current}
              onChange={onCheckboxChange}
              style={{ cursor: 'pointer' }}
            />{' '}
            <label htmlFor='current' style={{ cursor: 'pointer' }}>
              Current School or Bootcamp
            </label>
          </p>
        </div>
        {!disableToDate && (
          <div className='form-group'>
            <h4>To Date</h4>
            <input type='date' name='to' value={to} onChange={onChange} />
          </div>
        )}
        <div className='form-group'>
          <textarea
            name='description'
            cols='30'
            rows='5'
            placeholder='Program Description'
            value={description}
            onChange={onChange}
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

export default AddEducation;
