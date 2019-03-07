import * as types from '../constants/actionTypes'
import axios from 'axios';


export const updateSearchStr = (text) => ({
  type: types.UPDATE_SEARCH_STR,
  payload: text
});

export const updateSearchLoc = (text) => ({
  type: types.UPDATE_SEARCH_LOC,
  payload: text
});

export const requestList = () => (dispatch, getState) => {
  let body = {searchStr: getState().business.searchStr};
  let searchLoc = getState().business.searchLoc;
  if(searchLoc === 'Current Location') {
    body.latitude = getState().business.latitude;
    body.longitude = getState().business.longitude;
  } else {
    body.searchLoc = getState().business.searchLoc;
  }
  
  axios.post('/api/yelp', body)
  .then( res => {
    if ( res.status === 200) {
      dispatch({
        type: types.RECEIVE_LIST,
        payload: res.data,
      });
    }
  })
  .catch(console.error);
};


export const selectCard = (index) => ({
  type: types.SELECT_CARD,
  payload: index,
});

export const removeCard = (index) => ({
  type: types.REMOVE_CARD,
  payload: index,
});

export const displayModal = () => ({
  type: types.DISPLAY_MODAL,
});

export const closeModal = () => ({
  type: types.CLOSE_MODAL,
});

export const useGeoloc = (lat, long) => ({
  type: types.USE_GEOLOC,
  lat,
  long,
});

export const displaySignin = () => ({
  type: types.DISPLAY_SIGNIN,
});

export const closeSignin = () => ({
  type: types.CLOSE_SIGNIN,
});

export const signIn = () => (dispatch, getState) => {
  const body = {
    username: getState().business.username,
    password: getState().business.password,
  };

  axios.post('/signin', body)
  .then(res => {
    if (res.status === 200) {
      switch (res.data.status) {
        case "success": {
          dispatch({
            type: types.SIGN_IN,
            payload: res.data,
          });
          break;
        }
        default: {
          dispatch({
            type: types.SIGN_OUT,
          });
        }
      }
    }
  })
  .catch(console.error);
}

export const register = () => (dispatch, getState) => {
  let body = {
    username: getState().business.regUser,
    password: getState().business.regPw,
    name: getState().business.regName,
  };

  axios.post('/register', body)
  .then(res => {
    if (res.status === 200) {
      dispatch({
        type: types.SIGN_IN,
        payload: res.data,
      });
    }
  })
  .catch(console.error);
}

export const signOut = () => ({
  type: types.SIGN_OUT,
});

export const updateUsername = (text) => ({
  type: types.UPDATE_USERNAME,
  payload: text
});

export const updatePassword = (text) => ({
  type: types.UPDATE_PASSWORD,
  payload: text
});

export const updateRegName = (text) => ({
  type: types.UPDATE_REG_NAME,
  payload: text
});

export const updateRegUser = (text) => ({
  type: types.UPDATE_REG_USER,
  payload: text
});

export const updateRegPw = (text) => ({
  type: types.UPDATE_REG_PW,
  payload: text
});

export const saveFavorite = () => (dispatch, getState) => {
  let body = {
    id: getState().business.id,
    favorite: getState().business.selectedList,
  };
  console.log(body);
  axios.post('/save', body)
  .then(res => {
    if (res.status === 200) {
      dispatch({
        type: types.SAVE_FAVORITE,
      });
    }
  })
  .catch(console.error);
}

export const loadFavorite = () => ({
  type: types.LOAD_FAVORITE,
});