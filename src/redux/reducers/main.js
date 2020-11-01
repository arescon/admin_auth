import {
  SET_CUR_PAGE,
  SET_STATUS_AUTH,
} from '../actions/main';

export const initStore = {
  cur_page: 0,
  status_auth: 0,
  user: {}
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
    default:
      return state;
  }
};

export default handlers;
