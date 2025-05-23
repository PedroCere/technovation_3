import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = { email, password };

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Credenciales incorrectas. Inténtalo de nuevo.');
        return;
      }

      const authResponse = await response.json();
      setUser(authResponse.user);
      console.log('Logged in user set in context:', authResponse.user);

      setError('');
      navigate('/home');
    } catch (error) {
      console.error(error);
      setError('Error de conexión con el servidor.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>

        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Correo electrónico</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded-lg bg-gray-100 border border-gray-300 text-gray-900"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-1">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded-lg bg-gray-100 border border-gray-300 text-gray-900"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-700 transition"
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
