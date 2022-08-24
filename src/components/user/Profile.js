/* eslint-disable no-underscore-dangle */
/* eslint-disable react/button-has-type */
import { React, useState } from 'react';
import {
  useNavigate,
  NavLink,
  Routes,
  Route,
  useParams,
} from 'react-router-dom';
import { Image } from 'cloudinary-react';
import { BsFillGearFill } from 'react-icons/bs';
import { TiPlus } from 'react-icons/ti';
import MyArticles from '../article/MyArticles';
import UploadAvatar from './UploadAvatar';
import FavoritesArticles from '../article/FavoritesArticles';
import Missing from '../../pages/Missing';
import { useGetUserByNameQuery, useFollowUserMutation } from '../../api/userApiSlice';


import useAuth from '../../hooks/useAuth';

const Profile = () => {
  const { userID } = useParams();
  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
  } = useGetUserByNameQuery(userID);
  const [follow] = useFollowUserMutation();
  const [tab, setTab] = useState(1);
  const [toggleModal, setToggleModal] = useState(false);
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const handleSetting = () => {
    navigate('/settings');
  };
  const handleFollow = async () => {
    if (auth.accessToken) {
      const response = await follow(userID).unwrap();
      const roles = Object.values(response.roles);
      setAuth({ user: response, accessToken: auth.accessToken, roles });
    } else {
      navigate('/login');
    }
  };
  const triggerTab = index => {
    setTab(index);
  };
  const handleToggleModal = () => {
    setToggleModal(true);
  };
  const handleCloseModal = () => {
    setToggleModal(false);
  };
  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = (
      <section className="profileview">
        <div className="profileview__banner">
          <button onClick={handleToggleModal} className="profile-avatar">
            <Image cloudName="djvvdjhel" publicId={user.url} />
          </button>
          {toggleModal && (<UploadAvatar onClose={handleCloseModal} />)}
          <h4>{userID}</h4>
          {auth?.user?.name === userID ? (
            <div className="profileview__banner__btn">
              <button onClick={() => handleSetting()}>
                <BsFillGearFill />
                Edit Profile Settings
              </button>
            </div>
          ) : (
            <div className="profileview__banner__btn">
              <button onClick={() => handleFollow()}>
                <TiPlus />
                {auth?.user?.followings.includes(user._id) ? 'UnFollow ' : 'Follow '}
                {userID}
              </button>
            </div>
          )}
        </div>

        <nav className="profileview__link">
          <ul className="profileview__link__list">
            <li className={tab !== 1 ? 'profileview__link__item' : 'profileview__link__itemactived'}>
              <NavLink
                to=""
                onClick={() => { triggerTab(1); }}
              >
                My Articles
              </NavLink>
            </li>
            <li className={tab !== 2 ? 'profileview__link__item' : 'profileview__link__itemactived'}>
              <NavLink
                to="favorites"
                onClick={() => { triggerTab(2); }}
              >
                Favorited Articles
              </NavLink>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<MyArticles />} />
          <Route path="/favorites" element={<FavoritesArticles />} />
        </Routes>
      </section>
    );
  } else if (isError) {
    content = <Missing/>;
  }

  return content;
};

export default Profile;
