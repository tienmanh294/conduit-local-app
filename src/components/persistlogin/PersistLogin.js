/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Outlet } from 'react-router-dom';
import { useState, useEffect, React } from 'react';
import useRefreshToken from '../../hooks/userRefreshToken';
import useAuth from '../../hooks/useAuth';
import GlobalFeed from '../home/GlobalFeed';
import Tags from '../home/Tags';
import FeedByTag from '../home/FeedByTag';
import Banner from '../home/Banner';

function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const [toggleTab, setToggleTab] = useState(2);
  const [tag, setTag] = useState('');
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();
  useEffect(() => {
    let isMounted = true;
    // console.log("persist login");
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    // persist added here AFTER tutorial video
    // Avoids unwanted call to verifyRefreshToken
    !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
  }, []);
  const toggleFeed = index => {
    setToggleTab(index);
    setTag('');
  };
  const toggleFeedTag = (index, tagName) => {
    setToggleTab(index);
    setTag(tagName);
  };
  return (
    <>
      {!persist ? (
        <Outlet />
      ) : isLoading ? (
        <div className="mainview">
          <Banner />
          <div className="btn-container">
            <div className={toggleTab === 2 ? 'btn btn-feed__active' : 'btn btn-feed'} onClick={() => toggleFeed(2)}>Global Feed</div>
            {tag !== '' && (
              <div className="btn btn-tag">
                #
                {tag}
              </div>
            )}
          </div>
          {toggleTab === 2 ? (<GlobalFeed />) : (<FeedByTag tag={tag} />)}
          <div className="mainview__tags">
            <p>Polular Tags</p>
            <Tags onClick={toggleFeedTag} />
          </div>

        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
}

export default PersistLogin;
