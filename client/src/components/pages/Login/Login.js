import { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { API_URL } from '../../../config';
import { useDispatch } from 'react-redux';
import { logIn } from '../../../redux/usersRedux';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(null); // 'loading', 'success', 'serverError', 'clientError'

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ login, password }),
      credentials: 'include',
    };

    setStatus('loading');
    fetch(`${API_URL}/auth/login`, options)
      .then((res) => {
        if (res.status === 200) {
          setStatus('success');
          return res.json();
        } else if (res.status === 400) {
          setStatus('clientError');
        } else {
          setStatus('serverError');
        }
      })
      .then((data) => {
        if (data) {
          dispatch(logIn(data.user));
          setTimeout(() => navigate('/'), 1500);
        }
      })
      .catch(() => setStatus('serverError'));
  };

  return (
    <Form className='col-12 col-sm-3 mx-auto' onSubmit={handleSubmit}>
      <h1 className='my-4'>Sign in</h1>

      {status === 'success' && (
        <Alert variant='success'>
          <p>Login successful! Redirecting...</p>
        </Alert>
      )}

      {status === 'clientError' && (
        <Alert variant='danger'>
          <p>Incorrect login or password.</p>
        </Alert>
      )}

      {status === 'serverError' && (
        <Alert variant='danger'>
          <p>Unexpected error... Try again later.</p>
        </Alert>
      )}

      {status === 'loading' && (
        <Spinner animation='border' className='d-bloc mx-auto mb-3' />
      )}

      <Form.Group className='mb-3' controlId='formLogin'>
        <Form.Label>Login</Form.Label>
        <Form.Control
          type='text'
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          placeholder='Enter login'
          required
        />
      </Form.Group>

      <Form.Group className='mb-3' controlId='formPassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
          required
        />
      </Form.Group>

      <Button variant='primary' type='submit'>
        Sign in
      </Button>
    </Form>
  );
};

export default Login;
