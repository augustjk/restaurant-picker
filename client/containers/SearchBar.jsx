import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

const mapStateToProps = store => ({
  searchStr: store.business.searchStr,
  searchLoc: store.business.searchLoc,
  loggedIn: store.business.loggedIn,
});

const mapDispatchToProps = dispatch => ({
  updateSearchStr: (text) => { dispatch(actions.updateSearchStr(text)) },
  updateSearchLoc: (text) => { dispatch(actions.updateSearchLoc(text)) },
  requestList: () => { dispatch(actions.requestList())},
  useGeoloc: (lat, long) => { dispatch(actions.useGeoloc(lat, long)) },
  displaySignin: () => { dispatch(actions.displaySignin()) },
  signOut: () => { dispatch(actions.signOut()) },
});

const SearchBar = props => {

  function handleSubmit(e) {
    e.preventDefault();
    props.requestList();
  }

  function handleCurrentLoc() {
    if ("geolocation" in navigator) {
      /* geolocation is available */
      navigator.geolocation.getCurrentPosition(position=>{
        props.useGeoloc(position.coords.latitude, position.coords.longitude);
      })
    } else {
      /* geolocation IS NOT available */
      alert("Your browser does not support geolocation :(");
    }
  }

  let login;
  if (props.loggedIn) {
    login = <button id="signout" onClick={props.signOut}>Sign Out</button>;
  } else {
    login = <button id="signin" onClick={props.displaySignin}>Sign In</button>;
  }

  return (
    <div id="outerheader">
      <form id="innerheader" onSubmit={handleSubmit}>
        <label htmlFor="searchStr">Find </label>
        <input id="searchStr" type="text" value={props.searchStr} placeholder="e.g. Food / Sushi / Bars" onChange={(e)=>props.updateSearchStr(e.target.value)}></input>
        <label htmlFor="searchLoc">Near </label>
        <input id="searchLoc" type="text" value={props.searchLoc} placeholder="e.g. Venice, CA / 90291 / Abbot Kinney" onChange={(e)=>props.updateSearchLoc(e.target.value)}></input>
        <img src="/build/location-icon-png-4240.png" height="25" style={{cursor: "pointer"}} title="Use Current Location" onClick={handleCurrentLoc}/>
        <button id="searchButton" className="button" type="submit">Search</button>
      </form>
      {login}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);