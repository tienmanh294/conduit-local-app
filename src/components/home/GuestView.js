
import { useState,  React } from 'react';
import GlobalFeed from '../home/GlobalFeed';
import Tags from '../home/Tags';
import FeedByTag from '../home/FeedByTag';
import Banner from '../home/Banner';

function GuestView() {
    const [toggleTab, setToggleTab] = useState(2);
    const [tag, setTag] = useState('');
    const toggleFeed = index => {
        setToggleTab(index);
        setTag('');
    };
    const toggleFeedTag = (index, tagName) => {
        setToggleTab(index);
        setTag(tagName);
    };
    return (
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
    );
}
export default GuestView;
