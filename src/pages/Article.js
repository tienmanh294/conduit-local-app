import React from 'react';
import { useParams } from 'react-router-dom';
import Article from '../components/article/Article';
import VideoArticle from '../components/article/VideoArticle';
import Missing from './Missing';
import { useGetArticleQuery } from '../api/articleApiSlice';

const ArticlePage = () => {
  const { slug } = useParams();
  const {
    data: article,
    isLoading,
    isSuccess,
    isError,
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
    content = <Missing/>;
  }

  return content;
};

export default ArticlePage;
