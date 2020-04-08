import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { updateDeliveryManFailure, updateDeliveryManSuccess } from './actions';

export function* updateDeliveryMan({ payload }) {
  try {
    const { id, name, email, avatar_id } = payload.data;

    const response = yield call(api.put, `/deliverymans/${id}`, {
      name,
      email,
      avatar_id,
    });

    toast.success('Dados do entregador atualizado com sucesso!!!');

    yield put(updateDeliveryManSuccess(response.data));
  } catch (err) {
    toast.error('Erro ao atualizar o perfil!!!');

    yield put(updateDeliveryManFailure());
  }
}

export default all([
  takeLatest('@deliveryMan/UPDATE_REQUEST', updateDeliveryMan),
]);
