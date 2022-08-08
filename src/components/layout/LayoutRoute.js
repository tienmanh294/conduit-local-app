import { Outlet } from 'react-router-dom';
import React from 'react';

function LayoutRoute() {
  return (
    <main className="layout-route">
      <Outlet />
    </main>
  );
}

export default LayoutRoute;
