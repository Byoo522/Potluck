import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [errors, setErrors] = useState([]);


  if (sessionUser) return <Redirect to="/" />;



  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  const handleDemoSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential: 'demo@user.io', password: 'password' }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };



  return (
    <>
    <div className='login-wrap'>
      <div className='login-page-container'>
        <div className='log-cont font'>
          <form onSubmit={handleSubmit} className='login-form'>
            <div className='new-event-header'>
              <h1>Log In</h1>
            </div>
            <ul>
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
            <label>
              Username or Email
              <input
                type="text"
                className='new-event-input font'
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                className='new-event-input font'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <div className='new-event-submit'>
              <button type="submit" className='login-btn button font yellow-bg'>Log In</button>
            </div>
            <div className='new-event-submit'>
              <button type='button' onClick={handleDemoSubmit} className='login-btn button font yellow-bg'>Demo Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}

export default LoginFormPage;
