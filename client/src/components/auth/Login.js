import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = e => {
    setFormData(formData => ({ ...formData, [e.target.name]: e.target.value }));
  };

  const onSubmit = e => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Fragment>
      <div className='alert alert-danger'>Invalid credentials</div>
      <h1 className='large text-primary'>Sign In</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Sign into Your Account
      </p>
      <form className='form' onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Login' />
      </form>
      <p className='my-1'>
        Don&lsquo;t; have an account? <Link to='/register'>Sign Up</Link>
      </p>
    </Fragment>
  );
}

export default Login;
