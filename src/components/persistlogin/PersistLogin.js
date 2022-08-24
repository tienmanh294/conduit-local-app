/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Outlet } from 'react-router-dom';
import { useState, useEffect, React } from 'react';
import useRefreshToken from '../../hooks/useRefreshToken';
import Loader from '../Loader';

function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  useEffect(() => {
    // console.log("persist login");
    const verifyRefreshToken = async () => {
      try {
        await refresh();
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    // persist added here AFTER tutorial video
    // Avoids unwanted call to verifyRefreshToken
    // setTimeout(() => {
    //   verifyRefreshToken()
    // }, 1000)
    verifyRefreshToken()
  }, []);
  
  return (
    <>
      {isLoading ? (
        <Loader>
          <div className="loader"></div>
        </Loader>
        
      ) : (
        // <>
        //   {
        //     auth.accessToken ?
        //       <Outlet /> :
        //       <div>guest</div>
        //   }
        // </>
        <Outlet /> 
      )}
    </>
  );
}

export default PersistLogin;
