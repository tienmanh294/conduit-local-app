/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-console */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image } from 'cloudinary-react';
import { nanoid } from '@reduxjs/toolkit';
import { BsFillSuitHeartFill } from 'react-icons/bs';
import { useAddToFavoritesMutation } from '../../api/articleApiSlice';
import useAuth from '../../hooks/useAuth';

const InfiniteArticleItem = React.forwardRef(({ article }, ref) => {
  const { description, title, createdAt, favorites, favorited, slug, tags, author } = article;
  const [add, { isLoading }] = useAddToFavoritesMutation();
  const [favoritesCount, setFavorites] = useState(favorites);
  const { auth } = useAuth();
  const navigate = useNavigate();
  const toggleFavoritesStatusHandler = async () => {
    if (auth.accessToken) {
      const response = await add(slug).unwrap();
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
  const articleBody = (
    <div className="feed__item">
      <div className="feed__item__meta">
        <Image cloudName="djvvdjhel" publicId={author.url} />
        <a href={`/${author.name}`}>{author.name}</a>
        <span>
          {createdAt.slice(0, 10)}
        </span>
        <div className={favorited.includes(auth.user?.name) ? 'feed__item__btnfavorited' : 'feed__item__btn'}>
          <button onClick={toggleFavoritesStatusHandler} disabled={isLoading}>
            <BsFillSuitHeartFill className={favorited.includes(auth.user?.name) ? 'feed__item__btnfavorited__heart' : 'feed__item__btn__heart'} />
            <span>
              {favorites}
            </span>
          </button>
        </div>
      </div>
      <a href={`/article/${slug}`} className="feed__item__link">
        <h1>{title}</h1>
        <p>{description}</p>
        <span>Read more...</span>
        <ul>
          {tags.map(tag => (
            <li key={nanoid()}>{tag}</li>
          ))}
        </ul>
      </a>
    </div>
  );
  const content = ref
    ? <article ref={ref}>{articleBody}</article>
    : <article>{articleBody}</article>;

  return content;
});

export default InfiniteArticleItem;
