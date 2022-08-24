import React from 'react';
import { Link } from 'react-router-dom';

function Missing() {
  return (
    <article className="missing">
      <h1>Oops!</h1>
      <p>Page Not Found</p>
      <div className="flexGrow">
        <Link to="/">Visit Our Homepage</Link>
      </div>
    </article>
  );
}

export default Missing;
