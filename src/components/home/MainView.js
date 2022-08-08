/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, React } from 'react';
import GlobalFeed from './GlobalFeed';
import MyFeed from './MyFeed';
import FeedByTag from './FeedByTag';
import Tags from './Tags';

function MainView() {
  const [toggleTab, setToggleTab] = useState(1);
  const [tag, setTab] = useState('');
  const toggleFeed = index => {
    setToggleTab(index);
    setTab('');
  };
  const toggleFeedTag = (index, tagName) => {
    setToggleTab(index);
    setTab(tagName);
  };
  return (
    <div className="homeview">
      <div className="homeview__feed">
        <div className="btn-container">
          <div className={toggleTab === 1 ? 'btn btn-feed__active' : 'btn btn-feed'} onClick={() => toggleFeed(1)}>My Feed</div>
          <div className={toggleTab === 2 ? 'btn btn-feed__active' : 'btn btn-feed'} onClick={() => toggleFeed(2)}>Global Feed</div>
          {tag !== '' && (
            <div className="btn btn-tag">
              #
              {tag}
            </div>
          )}
        </div>
        {toggleTab === 1 ? (
          <MyFeed />
        ) : toggleTab === 2 ? (
          <GlobalFeed />
        ) : (
          <FeedByTag tag={tag} />
        )}
      </div>
      <div className="homeview__tags">
        <p>Polular Tags</p>
        <Tags onClick={toggleFeedTag} />
      </div>
    </div>
  );
}

export default MainView;
