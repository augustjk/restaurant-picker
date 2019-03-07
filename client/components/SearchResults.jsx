import React from 'react';

import ListItem from './ListItem.jsx';

const SearchResults = props => {
  let items = [];
  for (let i = 0; i < props.searchList.length; i++) {
    items.push(<ListItem key={'l' + i} index={i} data={props.searchList[i]} handleClick={props.handleClick} />);
  }

  return (
    <div id="searchResults">
      <div className="listHeading">
      <p>Search Results</p>
      </div>
      <div className="list">
      {items}
      </div>
    </div>
  );
};

export default SearchResults;