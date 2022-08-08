/* eslint-disable react/prop-types */
import React from 'react';
import MainNavigation from './MainNavigation.js';
import Footer from './Footer.js';

function Layout(props) {
  const { children } = props;
  return (
    <div className="layout-container">
      <MainNavigation />
      <div className="layout">{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
