import React from 'react';
import { useParams } from 'react-router-dom';
import Article from '../components/article/Article';
import VideoArticle from '../components/article/VideoArticle';
import { useGetArticleQuery } from '../api/articleApiSlice';

const ArticlePage = () => {
  const { slug } = useParams();
  const {
    data: article,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetArticleQuery(slug);

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    if (article.video === '') {
      content = (
        <Article article={article} author={article.author} />
      );
    } else {
      content = (
        <VideoArticle article={article} author={article.author} />
      );
    }
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  return content;
};

export default ArticlePage;
