import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from 'react-router-dom';
import { signUp } from '../../store/session';
import styles from './SignUpForm.module.css';
import logo from '../../assets/logo_white.jpg';

const SignUpForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      await dispatch(signUp(firstName, lastName, username, email, password, profilePicture));
    }
  };

  const loginRedirect = () => {
    history.push('/login');
  }

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateFile = (e) => {
    const file = e.target.files[0];
    if(file) setProfilePicture(file);
  }

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };


  if (user) {
    return <Redirect to="/channels/1" />;
  }


  return (
    <div className={styles.pageWrapper}>
    <form onSubmit={onSignUp} className={styles.signupForm}>
      <span className={styles.logoContainer}>
        <img className={styles.logoImg} src={logo} />
        sn4ck
      </span>
      <div className={styles.inputContainer}>
        <h4 className={styles.header}>Create an Account</h4>
      </div>
      <div className={styles.inputContainer}>
        <label className={styles.inputLabel}>First Name</label>
        <input
          className={styles.signupInput}
          autocomplete="off"
          type="text"
          name="firstName"
          onChange={updateFirstName}
          value={firstName}
          required
          ></input>
      </div>
      <div className={styles.inputContainer}>
        <label className={styles.inputLabel}>Last Name</label>
        <input
          className={styles.signupInput}
          type="text"
          name="lastName"
          onChange={updateLastName}
          value={lastName}
          required
          ></input>
      </div>
      <div className={styles.inputContainer}>
        <label className={styles.inputLabel}>User Name</label>
        <input
          className={styles.signupInput}
          type="text"
          name="username"
          onChange={updateUsername}
          value={username}
          required
          ></input>
      </div>
      <div className={styles.inputContainer}>
        <label className={styles.inputLabel}>Email</label>
        <input
          className={styles.signupInput}
          type="email"
          name="email"
          onChange={updateEmail}
          value={email}
          required
          ></input>
      </div>
      <div className={styles.inputContainer}>
        <label className={styles.inputLabel}>Profile Picture</label>
        <input
          className={styles.signupFileInput}
          type='file'
          onChange={updateFile}
          name='profile_picture'
          id='file'
          />
          {!profilePicture && (<label for='file' className={styles.signupFileLabel}>
            Choose a file...
          </label>)}
          {profilePicture && (
            <div>
              <img className={styles.picturePreview} src={URL.createObjectURL(profilePicture)} />
              <p>{profilePicture.name}</p>
            </div>
            )}
          {profilePicture && (<label for='file' className={styles.signupFileLabelComplete}>
            Change Photo
          </label>)}
      </div>
      <div className={styles.inputContainer}>
        <label className={styles.inputLabel}>Password</label>
        <input
          className={styles.signupInput}
          type="password"
          name="password"
          onChange={updatePassword}
          value={password}
          required
          ></input>
      </div>
      <div className={styles.inputContainer}>
        <label className={styles.inputLabel}>Repeat Password</label>
        <input
          className={styles.signupInput}
          type="password"
          name="repeat_password"
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
          ></input>
      </div>
      <div className={styles.inputContainer}>
        <button type="submit" className={styles.submitButton}>Sign Up</button>
      </div>
      <div className={styles.loginContainer}>
        <p className={styles.alreadyHaveAnAccount}>Already have an account?</p>
        <span className={styles.loginLink} onClick={loginRedirect}>Log in</span>
      </div>
    </form>
  </div>
  );
};

export default SignUpForm;
