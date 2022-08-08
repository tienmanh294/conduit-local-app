/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-cycle */
/* eslint-disable react/button-has-type */
import { Routes, Link, Route, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useRef, useState, useEffect, React } from 'react';
import RegisterPage from '../../pages/Register';
import { userActions } from '../../store/user-slice';
import { useLoginMutation } from '../../api/articleApiSlice';
import useAuth from '../../hooks/useAuth';
import axios from '../../api/axios';
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
axios.defaults.withCredentials = true;

function LoginForm() {
  const { setAuth, persist, setPersist } = useAuth();
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
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  useEffect(() => {
    setErrMsg('');
  }, [emailValue, passwordValue]);
  const submitHandler = async event => {
    event.preventDefault();
    try {
      const userData = await login({ email: emailValue, password: passwordValue }).unwrap();
      const accessToken = userData?.token;
      dispatch(userActions.setCredentials({ ...userData, accessToken }));
      const user = userData?.user;
      const roles = Object.values(userData.user.roles);
      setAuth({ user, accessToken, roles });
      resetEmail();
      resetPassword();
      navigate('/');
      setPersist(prev => !prev);
    } catch (err) {
      if (!err?.status) {
        // isLoading: true until timeout occurs
        setErrMsg('No Server Response');
      } else if (err.status === 400) {
        setErrMsg('Username or Password is Wrong');
      } else if (err.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current.focus();
    }
  };
  const formIsValid = !!(emailIsValid && passwordIsValid);
  useEffect(() => {
    localStorage.setItem('persist', persist);
  }, []);
  const content = isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <section className="signin">
      <p
        ref={errRef}
        className={errMsg ? 'errmsg' : 'offscreen'}
        aria-live="assertive"
      >
        {errMsg}
      </p>

      <form className="signin__form" onSubmit={submitHandler}>
        <div className="signin__form__title">
          <h1>Sign in</h1>
        </div>
        <Link to="/register">Need an account?</Link>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
        <div className="signin__control">
          <input
            type="text"
            required
            maxLength={100}
            id="email"
            value={emailValue}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            placeholder="Email"
          />
          {emailHasError && <p className="validate">Please enter a valid email</p>}
        </div>

        <div className="signin__control">
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
        <div className={formIsValid ? 'new-article__btn-valid' : 'new-article__btn-notvalid'}>
          <button disabled={!formIsValid}>Login</button>
        </div>
      </form>
    </section>
  );
  return content;
}
export default LoginForm;
