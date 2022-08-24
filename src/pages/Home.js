import React from 'react';
import MainView from '../components/home/MainView';
import GuestView from '../components/home/GuestView';
import useAuth from '../hooks/useAuth';

function HomePage() {
  const {auth}=useAuth();
  return (
    <div className="home-page">
      {auth?.accessToken?(<MainView />):(<GuestView/>)}
    </div>
  );
}
export default HomePage;
