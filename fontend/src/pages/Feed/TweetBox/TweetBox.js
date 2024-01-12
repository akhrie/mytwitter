import React, { useState } from "react";
import "./TweetBox.css";
import { Avatar, Button } from "@mui/material";
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import axios from 'axios';
import useLoggedInUser from "../../../hooks/useLoggedInUser";
import auth from "../../../context/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function TweetBox() {
    const [post, setPost] = useState('')
    const [imageURL, setImageURL] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');
    const [username, setUsername] = useState(' ');
    const [loggedInUser] = useLoggedInUser(auth);
    const { user } = useAuthState(auth);
    const email = user?.email;

    const userProfilePic = loggedInUser[0]?.profileImage ? loggedInUser[0]?.profileImage : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"

    const handleUploadImage = e => {
        setIsLoading(true);
        const image = e.target.files[0];

        const formData = new FormData();
        formData.set('image', image)
    
        axios.post("https://api.imgbb.com/1/upload?key=7b6f680792e6ccad84e2feadae6d44ae", formData)
        // axios.post('http://localhost:5000/post', formData)
            .then(res => {
                setImageURL(res.data.data.display_url);
                 console.log(res.data.data.display_url);
                setIsLoading(false)
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            })
    }

    
    const handleTweet = async (e) => {
        e.preventDefault();
    
        try {
            let userName, userDisplayName;
            if (user?.providerData[0]?.providerId === 'password') {
                const response = await fetch(`http://localhost:5000/loggedInUser?email=${email}`);
                const data = await response.json();
                userName = data[0]?.username;
                userDisplayName = data[0]?.name;
            } else {
                userName = email?.split('@')[0];
                userDisplayName = user?.displayName;
            }
    
            const userPost = {
                profilePhoto: userProfilePic,
                post: post,
                photo: imageURL,
                username: userName,
                name: userDisplayName,
                email: email,
            };
            // console.log(userPost);
            setPost('');
            setImageURL('');
    
            const postResponse = await fetch('http://localhost:5000/post', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(userPost),
            });
    
            const postData = await postResponse.json();
            console.log(postData);
        } catch (error) {
            console.error('Error occurred:', error);
        }
    };
    
    
    
    return (
        <div className="tweetBox">
            <form onSubmit={handleTweet}>
                <div className="tweetBox__input">
                    <Avatar src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" />
                    <input
                        type="text"
                        placeholder="What's happening?"
                        onChange={(e) => setPost(e.target.value)}
                        value={post}
                        required
                    />
                    
                </div>
                <div className="imageIcon_tweetButton">
                    <label htmlFor='image' className="imageIcon">
                    {
                        isLoading ? <p>Uploading Image</p> : <p>{imageURL ? 'Image Uploaded' : <AddPhotoAlternateOutlinedIcon />}</p>
                    }
                    </label>
                    <input
                        type="file"
                        id='image'
                        className="imageInput"
                        onChange={handleUploadImage}
                    />
                    <Button className="tweetBox__tweetButton" type="submit">Tweet</Button>
                </div>
            </form>
        </div>
    );
}

export default TweetBox;
