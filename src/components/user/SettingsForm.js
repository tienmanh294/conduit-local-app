/* eslint-disable react/button-has-type */
import { useRef, useState, React } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userActions } from '../../store/user-slice';

import { useLogoutUserMutation, useUpdateUserMutation } from '../../api/userApiSlice';
import useAuth from '../../hooks/useAuth';

function SettingsForm() {
  const { auth, setAuth } = useAuth();
  const [logout] = useLogoutUserMutation();
  const [update] = useUpdateUserMutation();
  const { user } = auth;
  const [userName, setUserName] = useState(user.name);
  const [bio, setBio] = useState(user.bio);
  const [url, setURL] = useState(user.url);
  const emailInputRef = useRef(user.email);
  const passwordInputRef = useRef();
  const bioInputRef = useRef();
  const userNameInputRef = useRef(user.name);
  const urlInputRef = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async () => {
    const enteredURL = urlInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredBio = bioInputRef.current.value;
    const enteredUserName = userNameInputRef.current.value;

    const settingsData = {
      email: enteredEmail,
      password: enteredPassword,
      bio: enteredBio,
      name: enteredUserName,
      url: enteredURL,
    };
    const UpdateResponse = await update(settingsData).unwrap();
    setAuth({ user: UpdateResponse, accessToken: auth.accessToken, roles: auth.roles });
    dispatch(userActions.setCredentials(UpdateResponse));
    navigate(`/${enteredUserName}`);
  };
  function nameInputHandleChange(event) {
    setUserName(event.target.value);
  }
  function bioInputHandleChange(event) {
    setBio(event.target.value);
  }
  function urlInputHandleChange(event) {
    setURL(event.target.value);
  }
  const logoutHandler = async () => {
    await logout();
    dispatch(userActions.logout());
    setAuth({});
    navigate('/login', { replace: true });
  };

  return (
    <div className="setting-container">
      <fieldset className="setting-container__form">
        <div className="setting-container__form__title">
          <h1>Your Settings</h1>
        </div>
        <div className="setting-container__control">
          <input
            type="text"
            required
            id="picture"
            ref={urlInputRef}
            value={url}
            placeholder="URL of profile picture"
            onChange={urlInputHandleChange}
          />
        </div>
        <div className="setting-container__control">
          <input
            type="text"
            required
            id="username"
            ref={userNameInputRef}
            value={userName}
            onChange={nameInputHandleChange}
          />
        </div>
        <div className="setting-container__control">
          <textarea
            id="description"
            required
            rows="5"
            ref={bioInputRef}
            value={bio}
            placeholder="Short bio about you"
            onChange={bioInputHandleChange}
          />
        </div>
        <div className="setting-container__control">
          <input
            type="text"
            required
            id="email"
            ref={emailInputRef}
            defaultValue={user.email}
            readOnly
          />
        </div>
        <div className="setting-container__control">
          <input
            type="password"
            required
            id="password"
            ref={passwordInputRef}
            placeholder="New Password"
          />
        </div>
        <div className="setting-container__actions">
          <button onClick={() => submitHandler()}>Update Settings</button>
        </div>
      </fieldset>
      <div className="setting-container__logout">
        <button onClick={() => logoutHandler()}>Or click here to logout.</button>
      </div>
    </div>
  );
}
export default SettingsForm;
