import React, { useState } from "react";
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import twitterimg from "../../assests/image/twitter.jpeg";
import TwitterIcon from '@mui/icons-material/Twitter';
import auth from '../../firebase.init';
import GoogleButton from "react-google-button";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const [signInWithGoogle, goggleUser, goggleLoading, goggleError] = useSignInWithGoogle(auth);
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    if (user || goggleUser) {
        navigate("/");
        console.log(user);
        console.log(goggleUser);
    }
    if (error) {
        console.log(error.message);
    }
    if (loading) {
        console.log(loading);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email, password);
        signInWithEmailAndPassword(email, password);
    };

    const handleGoogleSignIn = async (e) => {
        signInWithGoogle();
    };

    return (
        <div className="login-container">
            <div className="image-container">
                <img className="image" src={twitterimg} alt="twitterImage" />
            </div>
            <div className="form-container">
                <div className="form-box">
                    <TwitterIcon style={{ color: "skyblue" }} />
                    <h2 className="heading">Happening now</h2>

                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            className="email"
                            placeholder="Email address"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            className="password"
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="btn-login">
                            <button type="submit" className="btn">Log In</button>
                        </div>
                    </form>
                    <hr />
                    <div>
                        <GoogleButton
                            className="g-btn"
                            type="light"
                            onClick={handleGoogleSignIn}
                        />
                    </div>
                </div>
                <div>
                        Don't have an account?
                        <Link
                            to="/signup"
                            style={{
                                textDecoration: 'none',
                                color: 'var(--twitter-color)',
                                fontWeight: '600',
                                marginLeft: '5px'
                            }}
                        >
                            Sign up
                        </Link>
                    </div>

                </div>


            </div>
    );
};

export default Login;
