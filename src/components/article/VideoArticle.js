/* eslint-disable no-underscore-dangle */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */

import { useParams, useNavigate } from 'react-router-dom';
import { useState, React, useEffect } from 'react';
import { AdvancedVideo } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { TiPlus } from 'react-icons/ti';
import { BsFillSuitHeartFill } from 'react-icons/bs';
import { Image } from 'cloudinary-react';
import { nanoid } from '@reduxjs/toolkit';
import { useDeleteArticleMutation, useAddToFavoritesMutation } from '../../api/articleApiSlice';
import { useFollowUserMutation } from '../../api/userApiSlice';
import { useAddCommentMutation } from '../../api/commentApiSlice';
import Comment from '../comment/Comment';
import useAuth from '../../hooks/useAuth';
import useInput from '../../hooks/use-input';

const isNotEmpty = value => value.trim() !== '';
function VideoArticle(props) {
  const { slug } = useParams();
  const { auth, setAuth } = useAuth();
  const { article, author } = props;
  const {
    value: commentValue,
    isValid: commentIsValid,
    hasError: commentHasError,
    valueChangeHandler: commentChangeHandler,
    inputBlurHandler: commentBlurHandler,
    reset: resetComment,
  } = useInput(isNotEmpty);
  const [favoritesCount, setFavorites] = useState(article.favorites);
  const [deleteArticle] = useDeleteArticleMutation();
  const [addToFavorited, { isLoading }] = useAddToFavoritesMutation();
  const [follow] = useFollowUserMutation();
  const [myVideo, setMyVideo] = useState('');
  const [addcomment] = useAddCommentMutation(slug);
  const navigate = useNavigate();
  const buttonEditArticle = () => {
    navigate(`/editor/${slug}`);
  };
  const buttonDeleteArticle = async () => {
    await deleteArticle(slug).unwrap();
    navigate(`/${auth.user.name}`);
  };
  const buttonFollowUser = async () => {
    if (auth.accessToken) {
      const response = await follow(author.name).unwrap();
      const roles = Object.values(response.roles);
      setAuth({ user: response, accessToken: auth.accessToken, roles });
    } else {
      navigate('/login');
    }
  };
  const buttonPostComment = async e => {
    e.preventDefault();
    const commentData = {
      body: commentValue,
    };
    await addcomment({ slug, ...commentData }).unwrap();
    resetComment();
  };
  const buttonFavorites = async () => {
    if (auth.accessToken) {
      const response = await addToFavorited(slug).unwrap();
      const isFavorites = response.favorited.includes(auth.user.name);
      if (!isLoading) {
        if (!isFavorites) {
          setFavorites(favoritesCount - 1);
        } else {
          setFavorites(favoritesCount + 1);
        }
      }
    } else {
      navigate('/login');
    }
  };
  useEffect(() => {
    const cld = new Cloudinary({
      cloud: {
        cloudName: process.env.REACT_APP_CLOUDINARY_NAME,
      },
    });
    setMyVideo(cld.video(`conduit/${article.video}`));
  }, []);

  const favorite = ` ( ${favoritesCount} )`;
  const formIsValid = !!(commentIsValid);
  return (
    <div className="video-container">
      <div className="video-container__banner">
        <p>{article.title}</p>
        <div className="video-container__banner__meta">
          <Image cloudName={`${process.env.REACT_APP_CLOUDINARY_NAME}`} publicId={author.url} />
          <a href={`/${article.author.name}`}>{article.author.name}</a>
          <span>
            {article.createdAt.slice(0, 10)}
          </span>
          {auth?.user?.name === article.author.name ? (
            <div className="article-container__banner__meta__btn">
              <button
                onClick={buttonEditArticle}
                className="video-container__banner__meta__btn__edit"
              >
                Edit
              </button>
              <button
                onClick={buttonDeleteArticle}
                className="video-container__banner__meta__btn__delete"
              >
                Delete
              </button>
            </div>
          ) : (
            <div className="video-container__banner__meta__btn">
              <button
                onClick={buttonFollowUser}
                className="video-container__banner__meta__btn__follow"
              >
                <TiPlus />
                {auth?.user?.followings.includes(article.author._id) ? 'UnFollow ' : 'Follow '}
                {' '}
                {article.author.name}
              </button>
              <button
                onClick={buttonFavorites}
                className={article.favorited.includes(auth?.user?.name) ? 'video-container__banner__meta__btn__favorite-active' : 'video-container__banner__meta__btn__favorite'}
              >
                <BsFillSuitHeartFill />
                {article.favorited.includes(auth?.user?.name) ? 'Unfavorite ' : 'Favorite'}
                {favorite}
              </button>
            </div>
          )}
        </div>

      </div>
      <div className="video-container-video">
        <AdvancedVideo cldVid={myVideo} controls />
        {article.tag !== 0 && (
          <ul>
            {article.tags.map(tag => (
              <li key={nanoid()}>{tag}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="video-container__meta">
        <Image cloudName={`${process.env.REACT_APP_CLOUDINARY_NAME}`} publicId={author.url} />
        <a href={`/${article.author.name}`}>{article.author.name}</a>
        <span>
          {article.createdAt.slice(0, 10)}
        </span>
        {auth?.user?.name === article.author.name ? (
          <div className="video-container__meta__btn">
            <div>
              <button onClick={buttonEditArticle}>
                Edit
              </button>
              <button onClick={buttonDeleteArticle}>
                Delete
              </button>
            </div>
          </div>
        ) : (
          <div className="video-container__meta__btn">
            <button
              onClick={buttonFollowUser}
              className="video-container__banner__meta__btn__follow"
            >
              <TiPlus />
              {auth?.user?.followings.includes(article.author._id) ? 'UnFollow ' : 'Follow '}
              {' '}
              {article.author.name}
            </button>
            <button
              onClick={buttonFavorites}
              className={article.favorited.includes(auth?.user?.name) ? 'video-container__banner__meta__btn__favorite-active' : 'video-container__banner__meta__btn__favorite'}
            >
              <BsFillSuitHeartFill />
              {article.favorited.includes(auth?.user?.name) ? 'Unfavorite ' : 'Favorite'}
              {favorite}
            </button>
          </div>
        )}
      </div>
      <div className="video-container__comment-container">
        {auth.accessToken ? (
          <div className="video-container__comment-container__comment">
            <div className="video-container__comment-container__comment__post">
              <textarea
                id="description"
                required
                rows="5"
                placeholder="Write a comment"
                value={commentValue}
                onChange={commentChangeHandler}
                onBlur={commentBlurHandler}
              />
              {commentHasError && <p>Please enter a comment</p>}
            </div>
            <div className="video-container__comment-container__comment__row-2">
              <Image cloudName={`${process.env.REACT_APP_CLOUDINARY_NAME}`} publicId={author.url} />
              <div className={formIsValid ? 'video-container__comment-container__comment__row-2__btn-valid' : 'video-container__comment-container__comment__row-2__btn-notvalid'}>
                <button
                  onClick={buttonPostComment}
                  disabled={!formIsValid}
                >
                  Post comment
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="video-container__comment-container__comment">Login to post comment</div>
        )}
        <Comment slug={article.slug} />
      </div>

    </div>
  );
}

export default VideoArticle;
