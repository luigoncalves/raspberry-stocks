import { changeUsername } from '../api/auth.api';
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { useNavigate } from 'react-router-dom';

function ChangeUsername() {
  const [password, setPassword] = useState('');
  const [newName, setNewName] = useState('');
  const [error, setError] = useState(null);
  const { isLoggedIn, user, authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    const changedUser = { newName, password, userId: user._id };

    console.log(changedUser);

    try {
      const response = await changeUsername(changedUser);
      authenticateUser();
      console.log('Response:', response);
      navigate(`/profile/${user.name}`);
    } catch (error) {
      console.log('Error chnaging the username', error);

      setError(error.response.data.message);
    }
  };

  return (
    <>
      {isLoggedIn && (
        <div>
          <h1>Write your new Username</h1>
          <p>User Name: {user.name}</p>

          <form onSubmit={handleSubmit}>
            <label>New Username</label>
            <input
              type='name'
              name='newName'
              value={newName}
              onChange={e => setNewName(e.target.value)}
            />

            <label>Password</label>
            <input
              type='password'
              name='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            <button type='submit'>Confirm</button>
          </form>
          {error && <p>{error}</p>}
        </div>
      )}
    </>
  );
}

export default ChangeUsername;
