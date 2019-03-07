import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

import SearchResults from '../components/SearchResults.jsx';
import SelectedList from '../components/SelectedList.jsx';

const mapStateToProps = store => ({
  searchList: store.business.searchList,
  selectedList: store.business.selectedList,
});

const mapDispatchToProps = dispatch => ({
  selectCard: (index) => { dispatch(actions.selectCard(index)) },
  removeCard: (index) => { dispatch(actions.removeCard(index)) },
  displayModal: () => { dispatch(actions.displayModal()) },
  saveFavorite: () => { dispatch(actions.saveFavorite()) },
  loadFavorite: () => { dispatch(actions.loadFavorite()) }
});

const ListsContainer = props => {
  return (
    <div id="listsContainer">
      <SearchResults searchList={props.searchList} handleClick={props.selectCard} />
      <SelectedList selectedList={props.selectedList} handleClick={props.removeCard} displayModal={props.displayModal} saveFavorite={props.saveFavorite} loadFavorite={props.loadFavorite} />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ListsContainer);