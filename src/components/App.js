import { useState } from "react";
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

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLogin(user);
      } else {
        setIsLogin(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? <AppRouter isLoggendIn = {isLoggendIn} /> : "initializing..."}
      <footer> &copy; {new Date().getFullYear()} Nwitter </footer>
    </>
  );


}

export default App;
