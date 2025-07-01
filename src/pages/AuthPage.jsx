import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import '../styles/AuthPage.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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

  const EyeIcon = ({ isVisible }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="eye-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {isVisible ? (
        // Open eye
        <>
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
          <circle cx="12" cy="12" r="3" />
        </>
      ) : (
        // Slashed eye
        <>
          <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20C5 20 1 12 1 12a17.85 17.85 0 0 1 4.22-5.94" />
          <path d="M10.71 5.05A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a17.888 17.888 0 0 1-3.17 4.66" />
          <line x1="1" y1="1" x2="23" y2="23" />
        </>
      )}
    </svg>
  );

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
          title="No quill required—just your email."
        />

        <div className="password-wrapper" title="This box hides your secrets. Unless...">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <span
            className="toggle-eye"
            onClick={() => setShowPassword(!showPassword)}
            title={showPassword ? "Hide password (you've seen enough)" : "Peek at your password"}
          >
            <EyeIcon isVisible={showPassword} />
          </span>
        </div>

        <button type="submit" title={isLogin ? "Turn the page and return" : "Begin a new chapter"}>
          {isLogin ? 'Log In' : 'Sign Up'}
        </button>

        {error && <p className="auth-error">📛 {error}</p>}
      </form>

      <p className="auth-toggle" title="Switch stories, switch sides">
        {isLogin ? "New to this world?" : "Already part of the story?"}{' '}
        <span onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Sign up here." : "Log in here."}
        </span>
      </p>
    </div>
  );
};

export default AuthPage;

