/* eslint-disable import/no-cycle */
/* eslint-disable react/button-has-type */
/* eslint-disable max-len */
import { React, useState, useRef } from 'react';
import { Routes, Link, Route, useNavigate } from 'react-router-dom';
import LoginPage from '../../pages/Login';
import { useSignUpUserMutation } from '../../api/userApiSlice';
import useInput from '../../hooks/use-input';

const isNotEmpty = value => value.trim() !== '';
function isNumeric(str) {
  return /^\d+$/.test(str);
}

const isEmail = value => {
  const contain = value.includes('@');
  if (!contain) {
    return false;
  }
  const first = value.split('@');
  if (first[0] === '' || isNumeric(first[0][0])) {
    return false;
  }
  if (first[1] === '') {
    return false;
  }
  return true;
};

function RegisterForm() {
  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isEmail);
  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(isNotEmpty);
  const {
    value: usernameValue,
    isValid: usernameIsValid,
    hasError: usernameHasError,
    valueChangeHandler: usernameChangeHandler,
    inputBlurHandler: usernameBlurHandler,
    reset: resetUsername,
  } = useInput(isNotEmpty);
  const {
    value: confirmPasswordValue,
    isValid: confirmPasswordIsValid,
    hasError: confirmPasswordHasError,
    valueChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    reset: resetConfirmPassword,
  } = useInput(value => value === passwordValue);
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState('');
  const [signup, { isLoading }] = useSignUpUserMutation();
  const navigate = useNavigate();
  const submitHandler = async () => {
    try {
      const registerData = {
        name: usernameValue,
        email: emailValue,
        password: passwordValue,
      };
      await signup(registerData).unwrap();
      resetEmail();
      resetPassword();
      resetUsername();
      resetConfirmPassword();
      if (!isLoading) {
        navigate('/login');
      }
    } catch (err) {
      if (!err?.status) {
        // isLoading: true until timeout occurs
        setErrMsg('No Server Response');
      } else if (err.status === 400) {
        if (Object.keys(err.data.keyValue)[0] === 'name') {
          setErrMsg('Username exist!');
        }
        if (Object.keys(err.data.keyValue)[0] === 'email') {
          setErrMsg('Email exist!');
        }
      } else {
        setErrMsg('Sign up Failed');
      }
      errRef.current.focus();
    }
  };
  const formIsValid = !!(emailIsValid && passwordIsValid && usernameIsValid && confirmPasswordIsValid);
  const content = isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <form className="signup">
      <p
        ref={errRef}
        className={errMsg ? 'errmsg' : 'offscreen'}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <div className="signup__form__title">
        <h1>Sign up</h1>
      </div>
      <Link to="/login">Have an account?</Link>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <div className="signup__control">
        <input
          type="text"
          required
          maxLength={100}
          id="username"
          value={usernameValue}
          onChange={usernameChangeHandler}
          onBlur={usernameBlurHandler}
          placeholder="Username"
        />
        {usernameHasError && <p className="validate">Please enter a username</p>}
      </div>
      <div className="signup__control">
        <input
          type="text"
          required
          id="email"
          value={emailValue}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          placeholder="Email"
        />
        {emailHasError && <p className="validate">Please enter a valid email</p>}
      </div>

      <div className="signup__control">
        <input
          type="password"
          required
          id="password"
          value={passwordValue}
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          placeholder="Password"
        />
        {passwordHasError && <p className="validate">Please enter a password</p>}
      </div>
      <div className="signup__control">
        <input
          type="password"
          required
          id="repassword"
          value={confirmPasswordValue}
          onChange={confirmPasswordChangeHandler}
          placeholder="Confirm Password"
          onBlur={confirmPasswordBlurHandler}
        />
        {confirmPasswordHasError && <p className="validate">Confirm password not equal</p>}
      </div>

      <div className={formIsValid ? 'new-article__btn-valid' : 'new-article__btn-notvalid'}>
        <button
          onClick={() => {
            submitHandler();
          }}
          disabled={!formIsValid}
        >
          Sign up
        </button>
      </div>
    </form>
  );
  return content;
}
export default RegisterForm;
