import React, { useState, useEffect } from 'react';
import './mainprofile.css';
import EditProfile from '../EditProfile/EditProfile';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useNavigate } from 'react-router-dom';
import useLoggedInUser from '../../../hooks/useLoggedInUser';




const MainProfile = ({ user }) => {
 const navigate = useNavigate();
 
   const [loggedInUser] = useLoggedInUser();

  const username = user?.email?.split('@')[0];
 
  return (
    <div>
      <ArrowBackIcon className='arrow-icon' onClick={() => navigate('/')} />
      <h4 className='heading-4'>{username}</h4>
      <div className='mainprofile' >
   
        <div className='profile-bio'>
          {
            <div >
              <div className='coverImageContainer'>
                <img src={loggedInUser[0]?.coverImage ? loggedInUser[0]?.coverImage : 
                  'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'} alt="" className='coverImage' />
                <div className='hoverCoverImage'>
                  <div className="imageIcon_tweetButton">
                  <input
                        type="file"
                        id='profileImage'
                        className="imageInput"
                        // onChange={handleUploadProfileImage}
                      />

                  </div>  
               </div>
               </div>
               </div>
   
          }
        </div>
      </div>
    </div>
  );
};

export default MainProfile;