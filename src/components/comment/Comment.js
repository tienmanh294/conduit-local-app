/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useGetCommentsQuery } from '../../api/commentApiSlice';
import CommentItem from './CommentItem';

const Comment = props => {
  const {
    data: comments,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCommentsQuery(props.slug);

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = (
      <ul>
        {comments.map(comment => (
          <CommentItem
            key={comment._id}
            id={comment._id}
            body={comment.body}
            author={comment.author}
            date={comment.createdAt}
            slug={props.slug}
          />
        ))}
      </ul>
    );
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  return content;
};

export default Comment;
