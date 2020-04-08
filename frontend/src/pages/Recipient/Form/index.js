import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from '@rocketseat/unform';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';

import { Container } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  number: Yup.string().required(
    'O numero é obrigatório. Caso não tenha número prencha com SN'
  ),
  city: Yup.string().required('O estado é obrigatório'),
  state: Yup.string().required('A cidade é obrigatório'),
  cep: Yup.string().required('O CEP é obrigatório'),
});

export default function RecipientForm({ match }) {
  const { id } = match.params;
  const [recipient, setRecipient] = useState([]);

  useEffect(() => {
    async function loadRecipient() {
      const response = await api.get(`recipients/${id}`);

      setRecipient(response.data);
    }

    loadRecipient();
  }, [id]);

  async function handleSubmit(data) {
    if (id) {
      await api
        .put(`/recipients/${id}`, data)
        .then(function(res) {
          console.tron.log(res);
        })
        .catch(function(err) {
          console.tron.log(err.response);
        });
    } else {
      await api
        .post('/recipients', data)
        .then(function(res) {
          console.tron.log(res);
        })
        .catch(function(err) {
          console.tron.log(err.response);
        });
    }
    history.push('/recipient');
  }

  return (
    <Container>
      <Form
        schema={schema}
        initialData={id ? recipient : null}
        onSubmit={handleSubmit}
      >
        <header>
          <div>
            <strong>
              {id ? 'Edição de destinatário' : 'Cadastro de destinatários'}
            </strong>
          </div>
          <div className="btn">
            <Link to="/recipient">
              <button className="back" type="button">
                <MdKeyboardArrowLeft id="mdBack" size={26} />
                VOLTAR
              </button>
            </Link>
            <button className="save" type="submit" size={26}>
              <MdDone id="mdDone" />
              SALVAR
            </button>
          </div>
        </header>
        <div className="form">
          <div className="name">
            <span>Nome</span>
            <Input name="name" type="text" />
          </div>
          <div className="address1">
            <div className="street">
              <span>Rua</span>
              <Input name="street" type="text" />
            </div>
            <div className="number">
              <span>Numero</span>
              <Input name="number" type="text" />
            </div>
            <div className="complement">
              <span>Complemento</span>
              <Input name="complement" type="text" />
            </div>
          </div>
          <div className="address2">
            <div className="city">
              <span>Cidade</span>
              <Input name="city" type="text" />
            </div>
            <div className="state">
              <span>Estado</span>
              <Input name="state" type="text" />
            </div>
            <div className="cep">
              <span>CEP</span>
              <Input name="cep" type="text" />
            </div>
          </div>
        </div>
      </Form>
    </Container>
  );
}

RecipientForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }).isRequired,
  }).isRequired,
};
