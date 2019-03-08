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
  messageModal: false,
  message: '',
  name: '',
  errorMsg: '',
  regError: '',
  cookieMsg: '',
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
        messageModal: true,
        name: action.payload.name,
        message: `Wecome ${action.payload.name}!`,
      }
    }

    case types.SIGN_OUT: {
      return {
        ...state,
        messageModal: true,
        message: 'Good bye!',
        loggedIn: false,
      }
    }

    case types.UPDATE_USERNAME: {
      return {
        ...state,
        username: action.payload.toLowerCase(),
        errorMsg: '',
      };
    }

    case types.UPDATE_PASSWORD: {
      return {
        ...state,
        password: action.payload,
        errorMsg: '',
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
        regUser: action.payload.toLowerCase(),
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
        messageModal: true,
        message: 'Saved!',
      };
    }

    case types.LOAD_FAVORITE: {
      return {
        ...state,
        selectedList: state.favorite.slice(),
      };
    }

    case types.OPEN_MSG_MODAL: {
      return {
        ...state,
        message: action.payload,
        messageModal: true,
      }
    }

    case types.CLOSE_MSG_MODAL: {
      return {
        ...state,
        messageModal: false,
        cookieMsg: '',
      }
    }

    case types.SET_ERROR_MSG: {
      return {
        ...state,
        errorMsg: action.payload,
      }
    }

    case types.SET_REG_ERROR: {
      return {
        ...state,
        regError: action.payload,
      }
    }

    case types.CHECK_COOKIE: {
      return {
        ...state,
        messageModal: true,
        cookieMsg: 'This site uses cookies to remember your repeat visits. Usage of this site constitues your consent to the usage of cookies.',
      }
    }

    default:
      return state;
  }
};

export default businessReducer;