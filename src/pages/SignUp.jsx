import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../api/auth.api';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    const user = { email, password, name };

    try {
      await signup(user);
      navigate('/login');
    } catch (error) {
      console.log('Error signing up', error);
      // we are getting this from our backend
      setError(error.response.data.message);
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type='email'
          name='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type='password'
          name='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <label>Name</label>
        <input
          type='text'
          name='name'
          value={name}
          onChange={({ target }) => setName(target.value)}
        />

        <button type='submit'>Sign Up</button>
      </form>
      {error && <p>{error}</p>}

      <p>Already have an account?</p>

      <Link to={'/login'}>Log In</Link>
    </div>
  );
}

export default SignUp;
