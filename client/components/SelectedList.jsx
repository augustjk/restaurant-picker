import React from 'react';

import ListItem from './ListItem.jsx';

const SelectedList = props => {
  function handleButtonPress() {
    if (props.selectedList.length) {
      props.displayModal();
    }
  }

  function handleSave() {
    props.saveFavorite();
  }

  function handleLoad() {
    props.loadFavorite();
  }

  let items = [];
  for (let i = 0; i < props.selectedList.length; i++) {
    items.push(<ListItem key={'s' + i} index={i} data={props.selectedList[i]} handleClick={props.handleClick} />);
  }

  let buttons = [];
  if (props.loggedIn) {
    buttons.push(<button key="save" id="save" onClick={handleSave}>Save</button>, <button key="load" id="load" onClick={handleLoad}>Load</button>);
  }
  if (props.selectedList.length) {
    buttons.push(<button key="random" id="random" onClick={handleButtonPress}>Pick one for me!</button>);
  }

  return (
    <div id="selectedList">
      <div className="listHeading">
      <p id="candidates">Candidates</p>
      {buttons}
      </div>
      <div className="list">
      {items}
      </div>
    </div>
  );
};

export default SelectedList;