/* eslint-disable no-console */
/* eslint-disable react/button-has-type */
/* eslint-disable no-underscore-dangle */
import { useState, React } from 'react';
import ArticleItem from '../article/ArticleItem';
import { useGetFollowArticlesQuery } from '../../api/articleApiSlice';

const MyFeed = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const articlesPerPage = 10;
  const {
    data: articles,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetFollowArticlesQuery({ limit: articlesPerPage, skip: currentPage });
  const handleNextPage = () => {
    setCurrentPage(articlesPerPage + currentPage);
  };
  const handlePreviousPage = () => {
    if (currentPage - articlesPerPage >= 0) {
      setCurrentPage(currentPage - articlesPerPage);
    }
  };
  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    if (articles.articles.length !== 0) {
      content = (
        <div className="feed">
          <ul className="feed__list">
            {articles.articles.map(article => (
              <ArticleItem
                key={article._id}
                id={article._id}
                name={article.author.name}
                description={article.description}
                title={article.title}
                date={article.createdAt}
                favorites={article.favorites}
                favoritedArray={article.favorited}
                slug={article.slug}
                tags={article.tags}
                author={article.author}
              />
            ))}
          </ul>
          {currentPage !== 0 && (
            <div>
              <button onClick={() => handlePreviousPage()}>
                Previous Page
              </button>
            </div>
          )}
          {articles.articles.length === articlesPerPage && (
            <div>
              <button onClick={() => handleNextPage()}>Next Page</button>
            </div>
          )}
        </div>
      );
    } else {
      content = (
        <div className="feed-notification">
          <div>No articles are here... yet.</div>
          {currentPage !== 0 && (
            <div>
              <button onClick={() => handlePreviousPage()}>
                Previous Page
              </button>
            </div>
          )}
        </div>
      );
    }
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  return content;
};

export default MyFeed;
