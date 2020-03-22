import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { Link } from 'react-router-dom';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';

import { Container } from './styles';

import AvatarInput from '../AVatarInput';

export default function DeliveryManForm({ match }) {
  const [deliveryMan, setDeliveryMan] = useState([]);
  const { id } = match.params;

  useEffect(() => {
    async function loadDeliveryMan() {
      const response = await api.get(`deliverymans/${id}`);

      setDeliveryMan(response.data);
    }

    loadDeliveryMan();
  }, [deliveryMan]);

  async function handleSubmit(data) {
    const { name, email, avatar_id } = data;

    if (id) {
      await api.put(`/deliverymans/${id}`, {
        name,
        email,
        avatar_id,
      });
      history.push('/deliveryman');
    } else {
      await api.post('/deliverymans', {
        name,
        email,
        avatar_id,
      });

      history.push('/deliveryman');
    }
  }

  return (
    <Container>
      <Form initialData={id ? deliveryMan : null} onSubmit={handleSubmit}>
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
          <AvatarInput name="avatar_id" />
          <span>Nome</span>
          <Input name="name" type="text" />
          <span>Email</span>
          <Input name="email" type="text" />
        </div>
      </Form>
    </Container>
  );
}
