import React, { useEffect, useState } from 'react';
import { MdAdd, MdSearch, MdDeleteForever, MdModeEdit } from 'react-icons/md';
import { Link } from 'react-router-dom';

import api from '~/services/api';
import { Container, Table } from './styles';

import StatusMenu from '~/components/StatusMenu';

export default function Recipient() {
  const [recipient, setRecipient] = useState([]);
  const [destinatary, setDestinatary] = useState([]);

  useEffect(() => {
    async function loadRecipient() {
      const response = await api.get(`/recipients?name=${destinatary}`);

      setRecipient(response.data);
    }

    loadRecipient();
  }, [destinatary]);

  async function handleRemove(id) {
    const removeConfirm = window.confirm(
      'Tem certeza que deseja remover o destinatário?'
    );

    if (removeConfirm) {
      await api.delete(`/recipients/${id}`);

      document.location.reload(true);
    }
  }

  return (
    <Container>
      <header>
        <div>
          <strong>Gerenciando destinatários</strong>
        </div>
        <div className="btn-input">
          <div className="input">
            <MdSearch id="mdSearch" size={20} />
            <input
              type="text"
              placeholder="Buscar por destinatários"
              onChange={e => setDestinatary(e.target.value)}
            />
          </div>
          <Link to="/recipient-new">
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
            <td>Nome</td>
            <td>Endereço</td>
            <td>Ações</td>
          </tr>
        </thead>
        {recipient.length ? (
          recipient.map(data => (
            <tbody key={data.id}>
              <td>{`#${data.id}`}</td>
              <td>{data.name}</td>
              <td>{`${data.street}, ${data.number}${
                data.complement ? ` - ${data.complement}` : null
              }, ${data.city} - ${data.state}`}</td>
              <td>
                <StatusMenu ariaHideApp={false}>
                  <li>
                    <button type="button">
                      <Link to={`/recipient-edit/${data.id}`}>
                        <MdModeEdit size={20} color="#4D85EE" />
                        Editar
                      </Link>
                    </button>
                  </li>
                  <li>
                    <button type="button">
                      <Link
                        to="/recipient"
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
