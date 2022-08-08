import React from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { useGetTagsQuery } from '../../api/articleApiSlice';
import TagItem from './TagItem';

const Tags = props => {
  const {
    data: tags,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTagsQuery();
  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = (
      <div className="tags">
        <ul className="tags__list">
          {tags.map(tag => (
            <TagItem
              tagName={tag[0]}
              key={nanoid()}
              onClick={props.onClick}
            />
          ))}
        </ul>
      </div>

    );
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  return content;
};

export default Tags;
