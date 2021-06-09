import {
  LOGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  CHECK_AUTH_SUCCESS,
  CHECK_AUTH_FAILURE,
} from "./constants";

// Default state
const StateRecord = {
  auth: {},
  loading: false,
  authChecked: false,
};

function authReducer(state = StateRecord, action) {
  switch (action.type) {
    // Login

    case LOGIN: {
      return { ...state, loading: true };
    }
    case LOGIN_SUCCESS: {
      const { formattedUser } = action;

      return {
        ...state,
        auth: formattedUser,
        authChecked: true,
        loading: false,
      };
    }

    case LOGIN_FAILURE:
      return { ...state, loading: false, authChecked: false };

    // Check Auth

    case CHECK_AUTH_SUCCESS: {
      const { accessToken, user } = action.userData;

      return {
        ...state,
        auth: {
          user,
          accessToken,
        },
        authChecked: true,
      };
    }
    case CHECK_AUTH_FAILURE:
      return { ...state, authChecked: false, auth: {} };

    default:
      return state;
  }
}

export default authReducer;
