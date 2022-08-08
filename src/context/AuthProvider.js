/* eslint-disable spaced-comment */
/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState, React } from 'react';

const AuthContext = createContext({});

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({});
  const [persist, setPersist] = useState(JSON.parse(localStorage.getItem('persist')) || true);
  return (
    //useMemo
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
