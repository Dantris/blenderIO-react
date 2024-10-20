import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api';

function AuthForm() {
  const [formMode, setFormMode] = useState('login');  // 'login' or 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');  // Only needed for registration
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = formMode === 'login' ? '/auth/login' : '/auth/register';
    const data = formMode === 'login' ? { email, password } : { username, email, password };

    try {
      const response = await api.post(endpoint, data);
      login(response.data.token);  // Assuming your login context method can handle this universally
      navigate('/profile');
    } catch (error) {
      console.error(`Error during ${formMode}`, error);
    }
  };

  return (
    <div className="auth-form">
      <h1>{formMode === 'login' ? 'Login' : 'Register'}</h1>
      <form onSubmit={handleSubmit}>
        {formMode === 'register' && (
          <div>
            <label>Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
        )}
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">{formMode === 'login' ? 'Login' : 'Register'}</button>
      </form>
      <p onClick={() => setFormMode(formMode === 'login' ? 'register' : 'login')}>
        {formMode === 'login' ? 'No account? Register now!' : 'Have an account? Log in here!'}
      </p>
      <button onClick={handleGoogleLogin}>Sign in with Google</button> {/* Placeholder for Google OAuth */}
    </div>
  );
}

function handleGoogleLogin() {
  // Placeholder function for Google OAuth logic
  console.log("Google sign-in will be implemented here.");
}

export default AuthForm;
