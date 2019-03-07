import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

import ListItem from '../components/ListItem.jsx';

const mapStateToProps = store => ({
  displayModal: store.business.displayModal,
  selectedList: store.business.selectedList,
  randomlySelected: store.business.randomlySelected,
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => { dispatch(actions.closeModal()) },
});

const RandomModal = props => {
  if (!props.displayModal) return null;

  return (
    <div style={{
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      background: "rgba(0, 0, 0, 0.15)"
    }}>
      <div style={{
          position: "absolute",
          background: "#fff",
          top: "20%",
          left: "10%",
          right: "10%",
          padding: 15,
          border: "2px solid #444"
        }}>
        <h3>You should go to:</h3>
        <ListItem data={props.selectedList[props.randomlySelected]} handleClick={props.closeModal}/>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(RandomModal);