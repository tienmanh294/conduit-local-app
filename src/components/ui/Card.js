import React from 'react';
import classes from './Card.module.css';

function Card(props) {
  // eslint-disable-next-line react/prop-types
  const { children } = props;
  return <div className={classes.card}>{children}</div>;
}

export default Card;
