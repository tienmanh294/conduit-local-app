/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import axios from '../api/axios';

export const getPostsPage = async (pageParam = 0, options = {}) => {
  const response = await axios.get(`/articles?limit=10&skip=${pageParam * 10}`, options);
  return response.data.articles;
};

const usePosts = (pageNum = 0) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({});
  const [hasNextPage, setHasNextPage] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setError({});
    const controller = new AbortController();
    const { signal } = controller;
    getPostsPage(pageNum, { signal })
      .then(data => {
        setResults(prev => [...prev, ...data]);
        setHasNextPage(Boolean(data.length));
        setIsLoading(false);
      })
      .catch(e => {
        setIsLoading(false);
        if (signal.aborted) return;
        setIsError(true);
        setError({ message: e.message });
      });
    return () => controller.abort();
  }, [pageNum]);
  return { isLoading, isError, error, results, hasNextPage };
};

export default usePosts;
