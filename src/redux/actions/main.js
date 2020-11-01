export const SET_CUR_PAGE = 'SET_CUR_PAGE';
export const SET_STATUS_AUTH = 'SET_STATUS_AUTH';

export const setCurPage = (cur_page) => {
  return dispatch => {
    dispatch({
      type: SET_CUR_PAGE,
      payload: cur_page || 0
    })
  }
};

export const setStatusAuth = (status, user_data) => {
  return dispatch => {
    dispatch({
      type: SET_STATUS_AUTH,
      payload: {
        status: status || 0,
        user_data: user_data
      }
    })
  }
};