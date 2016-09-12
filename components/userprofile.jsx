import React from 'react';

const UserProfile = ( props ) => {
  return (
    <div className="profile-container">
      <img src={props.user.photoURL}></img>
      <h3>{props.user.displayName.split(' ')[0]}</h3>
      <div className="sign-out-button"
           onClick={() => props.signOutUser()}>sign out</div>
    </div>
  );
};

export default UserProfile;
