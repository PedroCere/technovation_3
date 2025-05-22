import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === '1234' && password === '1234') {
      setError('');
      navigate('/home');
    } else {
      setError('Credenciales incorrectas. Intentalo de nuevo.');
    }
  };

  return (
    <div className="min-h-screen bg-background text-text flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1e293b] p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>

        {error && <p className="text-danger mb-4 text-center">{error}</p>}

        <div className="mb-4">
          <label className="block text-sm text-secondary mb-1">Correo electrónico</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded-lg bg-background border border-secondary text-text"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm text-secondary mb-1">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded-lg bg-background border border-secondary text-text"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-lg hover:bg-cyan-700 transition"
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
