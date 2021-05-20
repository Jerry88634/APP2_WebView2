import * as types from './types';

const initState = {
  payType: 1,
  sendType: true,
};

const reducers = (state = initState, action) => {
  const { type, data } = action;
  switch (type) {
    case types.SET_PAY_TYPE:
      return { ...state, payType: data };
    case types.SET_SEND_TYPE:
      return { ...state, sendType: data };
    default:
      return state;
  }
};

export default reducers;
