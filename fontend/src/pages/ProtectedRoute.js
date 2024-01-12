import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth"; 
import auth from '../firebase.init';
import PageLoading from "./PageLoading";

const ProtectedRoute = ({ children }) => {
    const [user, loading] = useAuthState(auth);

    if (loading) {
       return<PageLoading/>
      
    }

    // console.log("Check user in Private: ", user);
    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
