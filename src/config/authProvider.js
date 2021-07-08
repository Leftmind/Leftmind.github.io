import {
    useEffect,
    useState,
    useContext,
    createContext,
    FunctionComponent,
  } from "react";
  import { firebase } from "../config/fbConfig";
  
  
  const AuthContext = createContext({
    user: null,
    loading: true,
    logout: () => {},
  });
  
  const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const cancelAuthListener = firebase.auth().onIdTokenChanged((u) => {
        setUser(u);
        setLoading(false);
      });
  
      return () => cancelAuthListener();
    }, []);
  
    return (
      <AuthContext.Provider
        value={{ user, loading, logout: () => firebase.auth().signOut() }}
      >
        {children}
      </AuthContext.Provider>
    );
  };
  
  function useAuth() {
    return useContext(AuthContext);
  }
  
  export { AuthProvider, useAuth };