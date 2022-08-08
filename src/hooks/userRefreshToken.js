/* eslint-disable no-unused-vars */
import axios from '../api/axios';
import store from '../store';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const refresh = async () => {
    const response = await axios.get('/users/refresh', {
      withCredentials: true,
      credentials: 'include',
      headers: {
        Authorization: store.getState().auth.token,
      },
    });
    setAuth(prev =>
    // console.log("this is user response")
    // console.log(response.data.user)
    // console.log(JSON.stringify(prev));
    // console.log("refresh token")
    // console.log(response.data.accessToken);

      ({
        user: response.data.user,
        accessToken: response.data.accessToken,
        roles: Object.values(response.data.user.roles),
      }),
    );
    return response.data.accessToken;
  };
  return refresh;
};
export default useRefreshToken;
