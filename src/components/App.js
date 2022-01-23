import { useReducer, useState } from "react";
import { useEffect } from 'react';
import AppRouter from "components/Router";
import { authService } from "fbase";


function App() {

  // return (
  //   <div>
  //     App
  //   </div>
  // );

  // return <AppRouter />

  const [init, setInit] = useState(false);
  const [isLoggendIn, setIsLogin] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        //setIsLogin(user);
        //setUserObj(user);
        setUserObj({
          uid: user.uid,
          displayName: user.displayName,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setIsLogin(false);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    //setUserObj(authService.currentUser);
    const user = authService.currentUser;
    setUserObj({
      uid: user.uid,
      displayName: user.displayName,
      updateProfile: (args) => user.updateProfile(args),
    });
  }

  return (
    <>
      {init ? (
        <AppRouter refreshUser={refreshUser} isLoggendIn = {Boolean(userObj)} userObj={userObj}/> 
        ):( 
          "initializing..."
        )}
       {/* <footer> &copy; {new Date().getFullYear()} Nwitter </footer> */}
    </>
  );


}

export default App;
