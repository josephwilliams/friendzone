import React from 'react';
import Header from './header';
import Auth from './auth';
import NewGame from './newgame';
import Results from './results';
import Footer from './footer';

export default class Splash extends React.Component {
  constructor () {
    super();
  }

  render () {
    return (
    <div className="splash-container">
      <Header />
      <Auth />
      <NewGame />
      <Results />
    </div>
    );
  }
}
