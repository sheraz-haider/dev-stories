import { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import useStore from '../../hooks/useStore';
import { login } from '../../store/actions/auth';

function Login() {
  const [
    {
      auth: { isLoggedIn },
    },
    dispatch,
  ] = useStore();

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
    dispatch(login(email, password));
  };

  if (isLoggedIn) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
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
