import React from 'react';

import SearchBar from './containers/SearchBar.jsx';
import ListsContainer from './containers/ListsContainer.jsx';
import RandomModal from './containers/RandomModal.jsx';
import SigninModal from './containers/SigninModal.jsx';

import styles from './styles/styles.css';

const App = props => {
  return (
    <div id="app">
      <SearchBar />
      <ListsContainer />
      <RandomModal />
      <SigninModal />
    </div>
  );
}

export default App;