import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { MdAdd, MdSearch, MdModeEdit, MdDeleteForever } from 'react-icons/md';

import api from '~/services/api';

import { Container, Table } from './styles';
import StatusMenu from '~/components/StatusMenu';

export default function DeliveryMan() {
  const [deliveryMan, setDeliveryMan] = useState([]);

  useEffect(() => {
    async function loadDeliveryMan() {
      const response = await api.get(`deliverymans`);

      setDeliveryMan(response.data);
    }

    loadDeliveryMan();
  }, []);

  async function handleRemove(id) {
    const removeConfirm = window.confirm(
      'Tem certeza que deseja remover o entregador?'
    );

    if (removeConfirm) {
      await api.delete(`/deliverymans/${id}`);

      document.location.reload(true);
    }
  }

  function initialName(fullName) {
    fullName = fullName.replace(/\s(de|da|dos|das)\s/g, ' ');
    const initials = fullName.match(/\b(\w)/gi);
    const lastNames = initials
      .splice(1, initials.length - 1)
      .join('')
      .toLowerCase();
    return initials + lastNames;
  }

  return (
    <Container>
      <header>
        <div>
          <strong>Gerenciando entregadores</strong>
        </div>
        <div className="btn-input">
          <div className="input">
            <MdSearch id="mdSearch" size={20} />
            <input type="text" placeholder="Buscar por entregadores" />
          </div>
          <Link to="deliveryman-new">
            <button type="button">
              <MdAdd id="mdAdd" size={24} />
              CADASTRAR
            </button>
          </Link>
        </div>
      </header>
      <Table>
        <thead>
          <tr>
            <td>ID</td>
            <td>Foto</td>
            <td>Nome</td>
            <td>Email</td>
            <td>Ações</td>
          </tr>
        </thead>
        {deliveryMan.length ? (
          deliveryMan.map(data => (
            <tbody key={data.id}>
              <td>{`#${data.id}`}</td>
              <td>
                <div className="name">
                  <div className="circle">
                    {data.avatar.url ? (
                      <img src={data.avatar.url} alt={data.name} />
                    ) : (
                      initialName(data.name)
                    )}
                  </div>
                </div>
              </td>
              <td>{data.name}</td>
              <td>{data.email}</td>
              <td>
                <StatusMenu ariaHideApp={false}>
                  <li>
                    <button type="button">
                      <Link to={`/deliveryman-edit/${data.id}`}>
                        <MdModeEdit size={20} color="#4D85EE" />
                        Editar
                      </Link>
                    </button>
                  </li>
                  <li>
                    <button type="button">
                      <Link
                        to="/delivery"
                        onClick={() => handleRemove(data.id)}
                      >
                        <MdDeleteForever size={20} color="#DE3B3B" />
                        Excluir
                      </Link>
                    </button>
                  </li>
                </StatusMenu>
              </td>
            </tbody>
          ))
        ) : (
          <tr>
            <td>Nenhum resultado encontrado</td>
          </tr>
        )}
      </Table>
    </Container>
  );
}
