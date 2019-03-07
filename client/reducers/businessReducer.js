import * as types from '../constants/actionTypes';
import update from 'immutability-helper';

const initialState = {
  searchStr: '',
  searchLoc: '',
  searchList: [],
  selectedList: [],
  displayModal: false,
  randomlySelected: NaN,
  latitude: NaN,
  longitude: NaN,
  loggedIn: false,
  signinModal: false,
  username: '',
  password: '',
  regName: '',
  regUser: '',
  regPw: '',
  favorite: [],
  id: null,
};

const businessReducer = (state=initialState, action) => {

  switch(action.type) {
    case types.UPDATE_SEARCH_STR: {
      return {
        ...state,
        searchStr: action.payload,
      };
    }

    case types.UPDATE_SEARCH_LOC: {
      return {
        ...state,
        searchLoc: action.payload,
      };
    }

    case types.RECEIVE_LIST: {
      let searchList = action.payload;
      return {
        ...state,
        searchList,
      };
    }
    
    case types.SELECT_CARD: {
      let selected = Object.assign({}, state.searchList[action.payload]);
      return update(state, {selectedList: {$push: [selected]},
        searchList: {$splice: [[action.payload, 1]]}
      });
    }

    case types.REMOVE_CARD: {
      let selected = Object.assign({}, state.selectedList[action.payload]);
      return update(state, {selectedList: {$splice: [[action.payload, 1]]},
        searchList: {$push: [selected]}
      });
    }

    case types.DISPLAY_MODAL: {
      let randomlySelected = Math.floor(Math.random()*state.selectedList.length);
      return {
        ...state,
        randomlySelected,
        displayModal: true,
      };
    }

    case types.CLOSE_MODAL: {
      return {
        ...state,
        displayModal: false,
      };
    }

    case types.USE_GEOLOC: {
      return {
        ...state,
        searchLoc: 'Current Location',
        latitude: action.lat,
        longitude: action.long,
      };
    }

    case types.DISPLAY_SIGNIN: {
      return {
        ...state,
        signinModal: true,
      };
    }

    case types.CLOSE_SIGNIN: {
      return {
        ...state,
        signinModal: false,
      };
    }

    case types.SIGN_IN: {
      return {
        ...state,
        loggedIn: true,
        signinModal: false,
        id: action.payload.id,
        favorite: action.payload.favorite,
      }
    }

    case types.SIGN_OUT: {
      return {
        ...state,
        loggedIn: false,
      }
    }

    case types.UPDATE_USERNAME: {
      return {
        ...state,
        username: action.payload,
      };
    }

    case types.UPDATE_PASSWORD: {
      return {
        ...state,
        password: action.payload,
      };
    }

    case types.UPDATE_REG_NAME: {
      return {
        ...state,
        regName: action.payload,
      };
    }

    case types.UPDATE_REG_USER: {
      return {
        ...state,
        regUser: action.payload,
      };
    }

    case types.UPDATE_REG_PW: {
      return {
        ...state,
        regPw: action.payload,
      };
    }

    case types.SAVE_FAVORITE: {
      return {
        ...state,
        favorite: state.selectedList.slice(),
      };
    }

    case types.LOAD_FAVORITE: {
      return {
        ...state,
        selectedList: state.favorite.slice(),
      };
    }

    default:
      return state;
  }
};

export default businessReducer;