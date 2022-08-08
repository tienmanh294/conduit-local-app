import { NavLink } from 'react-router-dom';
import React from 'react';
import useAuth from '../../hooks/useAuth';

function MainNavigation() {
  const { auth } = useAuth();
  return (
    <header className="header">
      <nav className="navigation__nav">
        <ul className="navigation__list">
          <li className="navigation__home">
            <NavLink to="/">conduit</NavLink>
          </li>
          {auth.accessToken && (
            <li className="navigation__item">
              <NavLink
                to={`/${auth.user.name}`}
              >
                {auth.user.name}
              </NavLink>
            </li>
          )}
          {auth.accessToken && (
            <li className="navigation__item">
              <NavLink
                to="/settings"
              >
                Settings
              </NavLink>
            </li>
          )}
          {auth.accessToken && (
            <li className="navigation__item">
              <NavLink
                to="/video"
              >
                New Video Article
              </NavLink>
            </li>
          )}
          {auth.accessToken && (
            <li className="navigation__item">
              <NavLink
                to="/editor"
              >
                New Article
              </NavLink>
            </li>
          )}
          {!auth.accessToken && (
            <li className="navigation__item">
              <NavLink
                to="/register"
              >
                Sign up
              </NavLink>
            </li>
          )}
          {!auth.accessToken && (
            <li className="navigation__item">
              <NavLink
                to="/login"
              >
                Login
              </NavLink>
            </li>
          )}
          <li className="navigation__item">
            <NavLink
              to="/"
            >
              Home
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
