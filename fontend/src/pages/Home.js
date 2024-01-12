import React from "react";
import { signOut } from 'firebase/auth';
import { useAuthState } from "react-firebase-hooks/auth";
import auth from '../firebase.init'; // Make sure this path is correct

import Sidebar from "./Sidebar/Sidebar";
import Widgets from "./Widgets/Widgets";
import { Outlet } from "react-router-dom";
 import useLoggedInUser from "../hooks/useLoggedInUser";

const Home = () => {
    const [user] = useAuthState(auth);
  const [loggedInUser] = useLoggedInUser(auth); // Pass auth object to the hook

    const handleLogout = async () => {
        signOut(auth);
    };

    return (
        <div className="app">
            <Sidebar handleLogout={handleLogout} user={user} />
            <Outlet />
            <Widgets />
        </div>
    );
};

export default Home;
