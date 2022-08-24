import React from 'react';
import { useParams } from 'react-router-dom';
import EditArticleForm from '../components/article/EditArticleForm';
import Missing from './Missing';
import { useGetArticleQuery } from '../api/articleApiSlice';

const EditArticle = () => {
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
    content = (
      <EditArticleForm
        title={article.title}
        about={article.description}
        content={article.body}
        tags={article.tags}
        author={article.author}
      />
    );
  } else if (isError) {
    content = <Missing/>;
  }

  return content;
};

export default EditArticle;
