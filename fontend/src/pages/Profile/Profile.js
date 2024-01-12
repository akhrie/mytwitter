import React from 'react';
import MainProfile from './MainProfile/MainProfile';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

function Profile() {
  const [user] = useAuthState(auth);

  return (
    <div className='profilePage'>
      {user && <MainProfile user={user} />}
    </div>
  );
}

export default Profile;
