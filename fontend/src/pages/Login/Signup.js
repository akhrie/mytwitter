import React, { useState } from "react";
import { useSignInWithEmailAndPassword} from 'react-firebase-hooks/auth';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'; 
import twitterimg from "../../assests/image/twitter.jpeg";
import TwitterIcon from '@mui/icons-material/Twitter';
import auth from '../../firebase.init';
import GoogleButton from "react-google-button";
import { Link } from "react-router-dom";
import axios from 'axios';
import "./Login.css";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const [signInWithGoogle, goggleUser, goggleLoading, goggleError] = useSignInWithGoogle(auth);
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    if (user || goggleUser) {
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
        const user = {
            username: username,
            name: name,
            email: email,
                };
                axios.post('http://localhost:5000/register', user)
                .then(response => {
                  console.log(response.data); // This will log the data returned from the backend
                  // Handle the response data as needed
                })
                .catch(error => {
                  console.error('Error:', error);
                  // Handle any errors that occurred during the request
                });
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
                <div>
                    <TwitterIcon className="Twittericon" style={{ color: "skyblue" }} />
                    <h2 className="heading">Happening now</h2>
                    <div class="d-flex align-items-sm-center">
                        <h3 className="heading1"> Join twitter today </h3>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <input
                            className="display-name"
                            type="username"
                            placeholder="@username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            className="display-name"
                            type="name"
                            placeholder="Enter Full Name"
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            className="email"
                            type="email"
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
                        <button type="submit" className="btn">Sign Up</button>
                        </div>
                    </form>
                    <hr />
                    <div className="google-button">
                        <GoogleButton
                            className="g-btn"
                            type="light"
                            onClick={handleGoogleSignIn}
                        />
                    </div>
                    <div>
                        Already have an account?
                        <Link
                            to="/login"
                            style={{
                                textDecoration: 'none',
                                color: 'var(--twitter-color)',
                                fontWeight: '600',
                                marginLeft: '5px'
                            }}
                        >
                            Log In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
