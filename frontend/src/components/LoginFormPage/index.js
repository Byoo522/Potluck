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
  // const [demoCredential, setDemoCredential] = useState("demo@user.io");
  // const [demoPassword, setDemoPassword] = useState("password");
  const [errors, setErrors] = useState([]);

  const demoUser = "demo@user.io";
  const demoPassword = "password";

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

  const handleDemoSubmit = () => {
    return dispatch(sessionActions.login({ credential, password }))
  };

  const handleDemoLogin = (e) => {
    e.preventDefault();
    setCredential('demo@user.io')
    setPassword('password')
    handleDemoSubmit()
  };

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Log In</button>
        <button type='button' onClick={handleDemoLogin}>Demo Login</button>
      </form>
    </>
  );
}

export default LoginFormPage;
