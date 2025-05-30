import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUser();

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError('Invalid Email');
      return;
    }

    if (password.length < 6) {
      setError('Password must be 6 characters or more.');
      return;
    }

    if (username.trim() === '') {
      setError('Username is required.');
      return;
    }

    const userData = { username, email, password };

    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Error en el registro.');
        return;
      }

      const authResponse = await response.json();
      setUser(authResponse.user);
      if (authResponse.token) {
        localStorage.setItem('token', authResponse.token);
      }
      console.log('Registered user set in context:', authResponse.user);

      setError('');
      setSuccess('Register Successful. Redirecting...');
      setTimeout(() => navigate('/inbox'), 1500);
    } catch (error) {
      console.error(error);
      setUser({ username, email });
      setError('');
      setSuccess('Register Successful. Redirecting...');
      setTimeout(() => navigate('/inbox'), 1500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 rounded-2xl shadow-lg"
        style={{ backgroundColor: 'var(--button-bg)', color: 'var(--text-color)' }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: 'var(--text-color)' }}>Create new Account</h2>

        {error && <p className="mb-4 text-center" style={{ color: 'var(--error-color)' }}>{error}</p>}
        {success && <p className="mb-4 text-center" style={{ color: 'var(--success-color)' }}>{success}</p>}

        <div className="mb-4">
          <label className="block text-sm mb-1" style={{ color: 'var(--button-text)' }}>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 rounded-lg border"
            style={{ backgroundColor: 'var(--input-bg)', borderColor: 'var(--border-color)', color: 'var(--text-color)' }}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1" style={{ color: 'var(--button-text)' }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded-lg border"
            style={{ backgroundColor: 'var(--input-bg)', borderColor: 'var(--border-color)', color: 'var(--text-color)' }}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm mb-1" style={{ color: 'var(--button-text)' }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded-lg border"
            style={{ backgroundColor: 'var(--input-bg)', borderColor: 'var(--border-color)', color: 'var(--text-color)' }}
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full py-2 rounded-lg transition"
          style={{ backgroundColor: 'var(--primary-color)', color: 'var(--button-text)' }}
          onMouseOver={e => e.currentTarget.style.backgroundColor = 'var(--primary-hover)'}
          onMouseOut={e => e.currentTarget.style.backgroundColor = 'var(--primary-color)'}
        >
        Register        </button>
      </form>
    </div>
  );
};

export default Register;
