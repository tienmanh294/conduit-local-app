/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

function TagItem(props) {
  const { tagName, onClick } = props;
  return (
    <div className="tags__item" onClick={() => { onClick(3, tagName); }}>
      {tagName}
    </div>
  );
}

export default TagItem;
