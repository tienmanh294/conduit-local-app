/* eslint-disable spaced-comment */
/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState, React } from 'react';

const AuthContext = createContext({});

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({});
  return (
    //useMemo
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
