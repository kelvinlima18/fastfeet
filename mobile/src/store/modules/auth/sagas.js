import { takeLatest, call, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';
import { signInSuccess, signFailure } from './actions';

import api from '~/services/api';

export function* signIn({ payload }) {
  try {
    const { deliveryManId } = payload;

    const response = yield call(api.post, `deliveryman/sessions`, {
      id: deliveryManId,
    });

    const { user, token } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(user.id, user, token));
  } catch (err) {
    Alert.alert('Erro no login', 'Falha na autenticação');
    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('persist/REHYDRATE', setToken),
]);
