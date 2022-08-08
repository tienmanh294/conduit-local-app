/* eslint-disable react/button-has-type */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import React, { useState, useRef, useCallback } from 'react';
import InfiniteArticleItem from './InfiniteArticleItem';
import usePosts from '../../hooks/useArticles';

function GlobalFeed() {
  const [pageNum, setPageNum] = useState(0);
  const {
    isLoading,
    isError,
    error,
    results,
    hasNextPage,
  } = usePosts(pageNum);
  const intObserver = useRef();
  const lastPostRef = useCallback(post => {
    if (isLoading) return;
    if (intObserver.current) intObserver.current.disconnect();
    intObserver.current = new IntersectionObserver(posts => {
      if (posts[0].isIntersecting && hasNextPage) {
        setPageNum(prev => prev + 1);
      }
    });

    if (post) intObserver.current.observe(post);
  }, [isLoading, hasNextPage]);
  if (isError) return <p>{JSON.stringify(error)}</p>;

  const content = results.map((article, i) => {
    if (results.length === i + 1) {
      return (
        <InfiniteArticleItem
          key={article._id}
          article={article}
          ref={lastPostRef}
        />
      );
    }
    return (
      <InfiniteArticleItem
        key={article._id}
        article={article}
      />
    );
  });

  return (
    <div className="feed">
      <ul className="feed__list">
        {content}
      </ul>
    </div>
  );
}

export default GlobalFeed;
