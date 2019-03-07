import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

const mapStateToProps = store => ({
  signinModal: store.business.signinModal,
  username: store.business.username,
  password: store.business.password,
  regName: store.business.regName,
  regUser: store.business.regUser,
  regPw: store.business.regPw,
});

const mapDispatchToProps = dispatch => ({
  closeSignin: () => { dispatch(actions.closeSignin()) },
  signIn: () => { dispatch(actions.signIn())},
  register: () => { dispatch(actions.register())},
  updateUsername: (text) => { dispatch(actions.updateUsername(text)) },
  updatePassword: (text) => { dispatch(actions.updatePassword(text)) },
  updateRegName: (text) => { dispatch(actions.updateRegName(text)) },
  updateRegUser: (text) => { dispatch(actions.updateRegUser(text)) },
  updateRegPw: (text) => { dispatch(actions.updateRegPw(text)) },
});

const SigninModal = props => {
  if (!props.signinModal) return null;

  function handleSignIn(e) {
    e.preventDefault();
    if (props.username && props.password){
      props.signIn();
    }
    
  } 

  function handleRegister(e) {
    e.preventDefault();
    if (props.regName && props.regUser && props.regPw) {
      props.register();
    }
  }

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
        <button id="closeSignin" onClick={props.closeSignin}>Close</button>
        <h3>Sign In</h3>
        <form onSubmit={handleSignIn}>
          <input className="signin" id="username" type="text" placeholder="Username" onChange={(e)=>props.updateUsername(e.target.value)}></input>
          <input className="signin" pw="password" type="password" placeholder="Password" onChange={(e)=>props.updatePassword(e.target.value)}></input>
          <button className="signin" type='submit'>Sign In</button>
        </form>
        <p>Or register below:</p>
        <form onSubmit={handleRegister}>
          <input className="register" id="reg_name" type="text" placeholder="Your name" onChange={(e)=>props.updateRegName(e.target.value)}></input>
          <input className="register" id="reg_username" type="text" placeholder="Username" onChange={(e)=>props.updateRegUser(e.target.value)}></input>
          <input className="register" pw="reg_password" type="password" placeholder="Password" onChange={(e)=>props.updateRegPw(e.target.value)}></input>
          <button className="register" type='submit'>Register</button>
        </form>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SigninModal);