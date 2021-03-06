import React, { useEffect, useState } from 'react';

import {
  MdAdd,
  MdSearch,
  MdRemoveRedEye,
  MdDeleteForever,
  MdModeEdit,
} from 'react-icons/md';
import { Link } from 'react-router-dom';

import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import api from '~/services/api';

import { Container, Table, Modal, PageButton } from './styles';
import StatusMenu from '~/components/StatusMenu';
import StatusColor from '~/components/StatusColor';

export default function Delivery() {
  const [delivery, setDelivery] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [deliveryModal, setDeliveryModal] = useState([]);
  const [recipientModal, setRecipientModal] = useState([]);
  const [signatureModal, setSignatureModal] = useState([]);
  const [product, setProduct] = useState('');

  const [page, setPage] = useState(1);

  useEffect(() => {
    async function loadDelivery() {
      const response = await api.get(`/deliveries?product=${product}`, {
        params: {
          quantity: 5,
          page,
        },
      });

      const data = response.data.map(check => ({
        ...check,
        initialName: check.delivery_man.name.replace(/\s/g, '+'),
      }));

      setDelivery(data);
    }
    loadDelivery();
  }, [product, page]);

  function handlePage(action) {
    return action === 'next' ? setPage(page + 1) : setPage(page - 1);
  }

  function openModal(bool) {
    setIsOpen(bool);
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function handleShow(id) {
    const response = await api.get(`deliveries/${id}`);

    const data = {
      ...response.data,
      formatedStartDate: response.data.start_date
        ? format(parseISO(response.data.start_date), 'dd/MM/yyyy', { ptBR })
        : null,
      formatedEndDate: response.data.end_date
        ? format(parseISO(response.data.end_date), 'dd/MM/yyyy', {
            ptBR,
          })
        : null,
    };

    setDeliveryModal(data);
    setRecipientModal(data.recipient);
    setSignatureModal(data.signature);
    openModal(true);
  }

  async function handleRemove(id) {
    const removeConfirm = window.confirm(
      'Tem certeza que deseja remover a encomenda?'
    );

    if (removeConfirm) {
      await api.delete(`/deliveries/${id}`);

      document.location.reload(true);
    }
  }

  return (
    <Container>
      <header>
        <div>
          <strong>Gerenciando encomendas</strong>
        </div>
        <div className="btn-input">
          <div className="input">
            <MdSearch id="mdSearch" size={20} />
            <input
              type="text"
              placeholder="Buscar por encomenda"
              onChange={e => setProduct(e.target.value)}
            />
          </div>
          <Link to="/delivery-new">
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
            <td>Produto</td>
            <td>Destinatário</td>
            <td>Entregador</td>
            <td>Cidade</td>
            <td>Estado</td>
            <td>Status</td>
            <td>Ações</td>
          </tr>
        </thead>
        {delivery.length ? (
          delivery.map(data => (
            <tbody key={data.id}>
              <tr>
                <td>{`#${data.id}`}</td>
                <td>{data.product}</td>
                <td>{data.recipient.name}</td>
                <td>
                  <div className="name">
                    <img
                      src={`https://ui-avatars.com/api/?size=140&background=f4effc&color=a28fd0&name=${data.initialName}`}
                      alt={data.delivery_man.name}
                    />
                    {data.delivery_man.name}
                  </div>
                </td>
                <td>{data.recipient.city}</td>
                <td>{data.recipient.state}</td>
                <td>
                  <StatusColor status={data.status} />
                </td>
                <td>
                  <StatusMenu
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    ariaHideApp={false}
                  >
                    <li>
                      <button type="button" onClick={() => handleShow(data.id)}>
                        <MdRemoveRedEye size={20} color="#8E5BE8" />
                        Visualizar
                      </button>
                    </li>
                    <li>
                      {data.status === 'ENTREGUE' ||
                      data.status === 'CANCELADA' ? (
                        <button type="button" disabled>
                          <MdModeEdit size={20} color="#4D85EE" />
                          Editar
                        </button>
                      ) : (
                        <button type="button">
                          <Link to={`/delivery-edit/${data.id}`}>
                            <MdModeEdit size={20} color="#4D85EE" />
                            Editar
                          </Link>
                        </button>
                      )}
                    </li>
                    <li>
                      {data.status === 'ENTREGUE' ||
                      data.status === 'CANCELADA' ? (
                        <button type="button" disabled>
                          <MdDeleteForever size={20} color="#DE3B3B" />
                          Excluir
                        </button>
                      ) : (
                        <button type="button">
                          <Link
                            to="/delivery"
                            onClick={() => handleRemove(data.id)}
                          >
                            <MdDeleteForever size={20} color="#DE3B3B" />
                            Excluir
                          </Link>
                        </button>
                      )}
                    </li>
                  </StatusMenu>
                </td>
              </tr>
            </tbody>
          ))
        ) : (
          <tbody>
            <tr>
              <td>Nenhum resultado encontrado</td>
            </tr>
          </tbody>
        )}
      </Table>
      <PageButton>
        <button type="button" onClick={() => handlePage('back')}>
          Anterior
        </button>
        <button type="button" onClick={() => handlePage('next')}>
          Próximo
        </button>
      </PageButton>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
      >
        <span>Informações da encomenda</span>
        <div>
          <strong>{recipientModal.name}</strong>
          <br />
          {`${recipientModal.street}, ${recipientModal.number} - `}
          {`${recipientModal.city} - ${recipientModal.state}, `}
          {recipientModal.cep}
        </div>
        <br />
        <span>Datas</span>
        <div className="dates">
          <div>Retirada: {deliveryModal.formatedStartDate}</div>
          <div>Entrega: {deliveryModal.formatedEndDate}</div>
        </div>
        <br />
        <span>Assinatura do Destinatario</span>
        <br />
        {signatureModal === null ? (
          <span> Encomenda não entregue </span>
        ) : (
          <img src={signatureModal.url} alt="" />
        )}
      </Modal>
    </Container>
  );
}
