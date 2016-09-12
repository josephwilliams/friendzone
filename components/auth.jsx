import React from 'react';
import UserProfile from './userprofile';

//Firebase
var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

const provider = new firebase.auth.GoogleAuthProvider();

export default class Profile extends React.Component {
  constructor () {
    super();
    this.state = {
      currentUser: null
    };
  }

  componentDidMount () {
    let that = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        that.setState({ currentUser: user });
      } else {
        console.log("no user signed in");
      }
    });
  }

  initiateSignIn () {
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  checkCurrentUser () {
    var user = firebase.auth().currentUser;
    if (user) {
      console.log("current user", user);
    }
  }

  signOutUser () {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }, function(error) {
      // An error happened.
    });
  }

  render () {
    if (this.state.currentUser !== null) {
      return (
        <UserProfile
          user={this.state.currentUser}
          signOutUser={this.signOutUser.bind(this)}
        />
      );
    } else {
      return (
        <div className="profile-container">
          <div className="sign-in-button"
               onClick={() => this.initiateSignIn()}>
            sign in with google
          </div>
        </div>
      );
    }
  }
}
