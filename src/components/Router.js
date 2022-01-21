import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/navigation";


const AppRouter = ({ isLoggendIn }) => {

    return (
        <Router>
            {isLoggendIn && <Navigation />}
            <Routes>
                { isLoggendIn? (
                    <>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    </>
                ) : (
                    <Route path="/" element={<Auth />} />
                )}
            </Routes>
        </Router>
    );
};

export default AppRouter;