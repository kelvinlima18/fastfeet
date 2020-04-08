export function updateDeliveryManRequest(data) {
  return {
    type: '@deliveryMan/UPDATE_REQUEST',
    payload: { data },
  };
}

export function updateDeliveryManSuccess(profile) {
  return {
    type: '@deliveryMan/UPDATE_SUCCESS',
    payload: { profile },
  };
}

export function updateDeliveryManFailure() {
  return {
    type: '@deliveryMan/UPDATE_FAILURE',
  };
}
