/* eslint-disable react/button-has-type */
/* eslint-disable arrow-parens */
/* eslint-disable react/prop-types */
import React from 'react';
import { Image } from 'cloudinary-react';
import { useDeleteCommentMutation } from '../../api/commentApiSlice';

function CommentItem(props) {
  const { slug, id, author, date, body } = props;
  const [deleteComment] = useDeleteCommentMutation(slug, id);
  const buttonDelete = async () => {
    await deleteComment({ slug, id }).unwrap();
  };
  return (
    <li>
      <div className="comment-item">
        <p>{body}</p>
        <div className="comment-item__infor">
          <Image cloudName={`${process.env.REACT_APP_CLOUDINARY_NAME}`} publicId={author.url} />
          <a href={`/${author.name}`}>{author.name}</a>
          <span>{date.slice(0, 10)}</span>
          <span>{date.slice(-13, -5)}</span>
        </div>
        <div className="comment-item__btn">
          <button
            onClick={buttonDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}

export default CommentItem;
