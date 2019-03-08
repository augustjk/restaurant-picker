import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

const mapStateToProps = store => ({
  message: store.business.message,
  messageModal: store.business.messageModal,
  cookieMsg: store.business.cookieMsg,
});

const mapDispatchToProps = dispatch => ({
  closeMsgModal: () => { dispatch(actions.closeMsgModal()) },
});

const MessageModal = props => {
  if (!props.messageModal) return null;

  return (
    <div className="modal" onClick={props.closeMsgModal} style={{
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      background: "rgba(0, 0, 0, 0.15)"
    }}>
      <div onClick={(e)=>e.stopPropagation()} style={{
          position: "absolute",
          background: "#fff",
          top: "20%",
          left: "10%",
          right: "10%",
          padding: 15,
          border: "2px solid #444"
        }}>
        <h3>{props.message}</h3>
        <h4>{props.cookieMsg}</h4>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageModal);