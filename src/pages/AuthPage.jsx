import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; // adjust path if needed
import './AuthPage.css'; // optional for custom styles

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? 'Welcome Back, Reader' : 'Step Into the Book'}</h2>
      <form onSubmit={handleAuth}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isLogin ? 'Log In' : 'Sign Up'}</button>
        {error && <p className="auth-error">{error}</p>}
      </form>
      <p className="auth-toggle">
        {isLogin ? "New to this world?" : "Already part of the story?"}{' '}
        <span onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Sign up here." : "Log in here."}
        </span>
      </p>
    </div>
  );
};

export default AuthPage;
