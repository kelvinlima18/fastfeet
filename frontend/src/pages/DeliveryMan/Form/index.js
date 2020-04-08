import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';

import { Container } from './styles';

import { updateDeliveryManRequest } from '~/store/modules/deliveryMan/actions';

import AvatarInput from '../AvatarInput';

const schema = Yup.object().shape({
  nome: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-manil valido')
    .required('O e-mail é obrigatório'),
});

export default function DeliveryManForm({ match }) {
  const [deliveryMan, setDeliveryMan] = useState([]);
  const [avatar, setAvatar] = useState([]);
  const dispatch = useDispatch();
  const { id } = match.params;

  useEffect(() => {
    async function loadDeliveryMan() {
      const response = await api.get(`deliverymans/${id}`);

      setDeliveryMan(response.data);
      setAvatar(response.data.avatar);
    }

    loadDeliveryMan();
  }, [id]);

  async function handleSubmit(data) {
    const { name, email, avatar_id } = data;

    const dataState = {
      id,
      name,
      email,
      avatar_id,
    };

    if (id) {
      dispatch(updateDeliveryManRequest(dataState));
      history.push('/deliveryman');
    } else {
      await api.post('/deliverymans', {
        name,
        email,
        avatar_id,
      });

      history.push('/deliveryman');
    }
    document.location.reload(true);
  }

  return (
    <Container>
      <Form
        schema={schema}
        initialData={id ? deliveryMan : null}
        onSubmit={handleSubmit}
      >
        <header>
          <div>
            <strong>
              {id ? 'Edição de entregador' : 'Cadastro de entregadores'}
            </strong>
          </div>
          <div className="btn">
            <Link to="/deliveryman">
              <button className="back" type="button">
                <MdKeyboardArrowLeft id="mdBack" size={26} />
                VOLTAR
              </button>
            </Link>
            <button className="save" type="submit">
              <MdDone id="mdDone" size={26} />
              SALVAR
            </button>
          </div>
        </header>
        <div className="form">
          <AvatarInput avatar={avatar.url} name="avatar_id" />
          <span>Nome</span>
          <Input name="name" type="text" />
          <span>Email</span>
          <Input name="email" type="text" />
        </div>
      </Form>
    </Container>
  );
}

DeliveryManForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }).isRequired,
  }).isRequired,
};
