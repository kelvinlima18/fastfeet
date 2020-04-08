export function signInRequest(deliveryManId) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { deliveryManId },
  };
}

export function signInSuccess(id, user, token) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { id, user, token },
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}

export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}
