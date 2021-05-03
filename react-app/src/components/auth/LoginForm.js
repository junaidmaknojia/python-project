import React, { useState } from "react";
import  { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import styles from './LoginForm.module.css';

const LoginForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const glblId = useSelector(state => state.defaultId.id)
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data.errors) {
      setErrors(data.errors);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (glblId && user) {
    return <Redirect to={`/channels/${glblId}`} />;
  }

  return (
    <div className={styles.loginPageDisplay}>
      <div className={styles.pageHeader}>
        <div className={styles.leftColumn}></div>
        <a className={styles.snackHeader} href='/'>
        <div className={styles.centerColumn}>
          <img className={styles.logo}
          src={require("../../assets/logo_purple.svg")}
          alt={'snack logo'}/>
          <a className={styles.snackHeader}>sn4ck</a>
        </div>
        </a>
        <div className={styles.rightColumn}>
          <div>
            New to Sn4ck?
            <br/>
            <a className={styles.signupLink} href="/sign-up">Create an account</a>
          </div>
          <div>
          </div>
        </div>
      </div>
      <div className={styles.pageHeading}>
        <h1 className={styles.signInText}>Sign in to sn4ck</h1>
        <p className={styles.siteUrl}>sn4ck.herokuapp.com</p>
      </div>
    <form className={styles.loginForm} onSubmit={onLogin}>
      <div className={styles.loginErrors}>
        {errors.map((error) => (
          <div>{error}</div>
        ))}
      </div>
      <div className={styles.emailInput}>
        <label htmlFor="email"></label>
        <input className={styles.emailBox}
          name="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div className={styles.passwordInput}>
        <label htmlFor="password"></label>
        <input className={styles.passwordBox}
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={updatePassword}
        />
      </div>
        <button className={styles.signinButton} type="submit">Sign In with email</button>
    </form>
    <div className={styles.footer}>
      <a href="">Privacy & Terms</a>
      <a href="">Contact Us</a>
      <a href="">Change Region</a>
    </div>
    </div>
  );
};

export default LoginForm;
