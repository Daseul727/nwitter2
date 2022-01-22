import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";
import { useState } from "react/cjs/react.development";


const AppRouter = ({ isLoggendIn, userObj }) => {

    return (
        <Router>
            {isLoggendIn && <Navigation userObj={userObj} />}
            <Routes>
                { isLoggendIn? (
                    <>
                    <Route path="/" element={<Home userObj={userObj}/>} />
                    <Route path="/profile" element={<Profile userObj={userObj}/>} />
                    </>
                ) : (
                    <Route path="/" element={<Auth />} />
                )}
            </Routes>
        </Router>
    );
};

export default AppRouter;