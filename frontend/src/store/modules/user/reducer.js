import produce from 'immer';

const INITIAL_STATE = {
  user_admin: null,
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_SUCCESS': {
        draft.user_admin = action.payload.user_admin;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.user_admin = null;
        break;
      }
      default:
        return state;
    }
  });
}
