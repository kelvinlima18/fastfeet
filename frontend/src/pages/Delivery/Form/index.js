import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Select } from './styles';

export default function DeliveryForm({ match }) {
  const [recipientSelect, setRecipientSelect] = useState([]);
  const [deliveryManSelect, setDeliveryManSelect] = useState([]);
  const [productSelect, setProductSelect] = useState({ product: '' });
  const { id } = match.params;

  const loadRecipient = async (inputValue, callback) => {
    const response = await api.get(`recipients`);

    const data = response.data.map(d => ({ value: d.id, label: d.name }));
    const filter = data.filter(i =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    callback(filter);
  };

  const loadDeliveyMan = async (inputValue, callback) => {
    const response = await api.get(`deliverymans`);

    const data = response.data.map(d => ({ value: d.id, label: d.name }));
    const filter = data.filter(i =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    callback(filter);
  };

  useEffect(() => {
    async function getSelectData() {
      const response = await api.get(`deliveries/${id}`);

      const recipientData = {
        value: response.data.recipient_id,
        label: response.data.recipient.name,
      };

      const deliveryManData = {
        value: response.data.deliveryman_id,
        label: response.data.delivery_man.name,
      };

      setRecipientSelect(recipientData);
      setDeliveryManSelect(deliveryManData);
      setProductSelect({ product: response.data.product });
    }

    getSelectData();
  }, [id]);

  async function handleSubmit(data) {
    console.tron.log({ data, deliveryManSelect, recipientSelect });

    if (id) {
      await api
        .put(`/deliveries/${id}`, {
          recipient_id: recipientSelect.value,
          deliveryman_id: deliveryManSelect.value,
          product: data.product,
        })
        .then(function(res) {
          console.tron.log(res);
        })
        .catch(function(err) {
          console.tron.log(err.response);
        });
    } else {
      await api
        .post('/deliveries', {
          recipient_id: recipientSelect.value,
          deliveryman_id: deliveryManSelect.value,
          product: data.product,
        })
        .then(function(res) {
          console.tron.log(res);
        })
        .catch(function(err) {
          console.tron.log(err.response);
        });
    }

    history.push('/delivery');
  }

  return (
    <Container>
      <Form initialData={productSelect} onSubmit={handleSubmit}>
        <header>
          <div>
            <strong>
              {id ? 'Edição de encomendas' : 'Cadastro de encomendas'}
            </strong>
          </div>
          <div className="btn">
            <Link to="/delivery">
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
          <div className="name">
            <div className="recipient">
              <span>Destinatário</span>
              <Select
                id="recipient"
                value={recipientSelect}
                loadOptions={loadRecipient}
                onChange={setRecipientSelect}
                placeholder="Buscar Destinatários"
              />
            </div>
            <div className="delivery-man">
              <span>Entregador</span>
              <Select
                id="deliveryman"
                value={deliveryManSelect}
                loadOptions={loadDeliveyMan}
                onChange={setDeliveryManSelect}
                placeholder="Buscar Entregadores"
              />
            </div>
          </div>
          <div className="product">
            <span>Nome do produto</span>
            <Input name="product" type="text" />
          </div>
        </div>
      </Form>
    </Container>
  );
}

DeliveryForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }).isRequired,
  }).isRequired,
};
