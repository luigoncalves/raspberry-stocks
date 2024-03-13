import { changeUserPassword } from '../api/auth.api';
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { useNavigate } from 'react-router-dom';

function ChangePassword() {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [error, setError] = useState(null);
  const { isLoggedIn, user, authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    const newPasswordObject = {
      password,
      newPassword,
      newPasswordConfirm,
      userId: user._id,
    };

    console.log(newPassword);

    try {
      const response = await changeUserPassword(newPasswordObject);
      // authenticateUser();
      console.log('Response:', response);
      navigate(`/profile/${user.name}`);
    } catch (error) {
      console.log('Error chnaging the password', error);

      setError(error.response.data.message);
    }
  };

  return (
    <>
      {isLoggedIn && (
        <div>
          <form onSubmit={handleSubmit}>
            <label>Current Password</label>
            <input
              type='password'
              name='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            <label>New Password:</label>
            <input
              type='password'
              name='newPassword'
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
            />
            <label>Confirm New Password:</label>
            <input
              type='password'
              name='newPasswordConfirm'
              value={newPasswordConfirm}
              onChange={e => setNewPasswordConfirm(e.target.value)}
            />

            <button type='submit'>Confirm</button>
          </form>
          {error && <p>{error}</p>}
        </div>
      )}
    </>
  );
}

export default ChangePassword;
