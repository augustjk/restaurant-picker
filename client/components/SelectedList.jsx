import React from 'react';

import ListItem from './ListItem.jsx';

const SelectedList = props => {
  let items = [];
  for (let i = 0; i < props.selectedList.length; i++) {
    items.push(<ListItem key={'s' + i} index={i} data={props.selectedList[i]} handleClick={props.handleClick} />);
  }

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

  return (
    <div id="selectedList">
      <div className="listHeading">
      <p>Candidates</p>
      <button id="save" onClick={handleSave}>Save</button>
      <button id="load" onClick={handleLoad}>Load</button>
      <button id="random" onClick={handleButtonPress}>Pick one for me!</button>
      </div>
      <div className="list">
      {items}
      </div>
    </div>
  );
};

export default SelectedList;