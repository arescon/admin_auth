import {
  SET_CUR_PAGE,
  SET_STATUS_AUTH,
  SET_MENU_USER
} from '../actions/main';

export const initStore = {
  cur_page: 0,
  status_auth: 0,
  user: {},
  root_menu: []
};

const handlers = (state = initStore, action) => {
  switch (action.type) {
    case SET_CUR_PAGE: {
      return { ...state, cur_page: action.payload }
    }
    case SET_STATUS_AUTH: {
      return { ...state,
        status_auth: action.payload.status,
        user: action.payload.user_data
      }
    }
    case SET_MENU_USER: {
      return { ...state,
        root_menu: action.payload
      }
    }
    default:
      return state;
  }
};

export default handlers;
