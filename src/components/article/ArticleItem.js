/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-console */
import { useState, React } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image } from 'cloudinary-react';
import { nanoid } from '@reduxjs/toolkit';
import { BsFillSuitHeartFill } from 'react-icons/bs';
import { useAddToFavoritesMutation } from '../../api/articleApiSlice';
import useAuth from '../../hooks/useAuth';

function ArticleItem(props) {
  const { name, description, title, date, favorites, favoritedArray, slug, tags, author } = props;
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
  return (
    <li className="feed__item">
      <div className="feed__item__meta">
        <Image cloudName={`${process.env.REACT_APP_CLOUDINARY_NAME}`} publicId={author.url} />
        <a href={`/${name}`}>{name}</a>
        <span>
          {date.slice(0, 10)}
        </span>
        <div className={favoritedArray.includes(auth.user?.name) ? 'feed__item__btnfavorited' : 'feed__item__btn'}>
          <button onClick={toggleFavoritesStatusHandler} disabled={isLoading}>
            <BsFillSuitHeartFill className={favoritedArray.includes(auth.user?.name) ? 'feed__item__btnfavorited__heart' : 'feed__item__btn__heart'} />
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
    </li>
  );
}

export default ArticleItem;
