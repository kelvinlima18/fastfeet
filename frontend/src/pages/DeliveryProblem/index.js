import React, { useEffect, useState } from 'react';
import { MdRemoveRedEye, MdDeleteForever } from 'react-icons/md';

import { Link } from 'react-router-dom';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Table, Modal } from './styles';
import StatusMenu from '~/components/StatusMenu';
import StatusColor from '~/components/StatusColor';

export default function DeliveryProblem() {
  const [problemModal, setProblemModal] = useState([]);
  const [problem, setProblem] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  useEffect(() => {
    async function loadProblem() {
      const response = await api.get(`delivery/problems`);

      console.tron.log(response.data);

      setProblem(response.data);
    }

    loadProblem();
  }, []);

  function openModal(bool) {
    setIsOpen(bool);
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function handleShow(id) {
    const response = await api.get(`/delivery/${id}/problems`);

    console.tron.log(response.data);

    setProblemModal(response.data);
    openModal(true);
  }

  async function handleRemove(id) {
    const canceled_at = new Date();

    const removeConfirm = window.confirm(
      'Tem certeza que deseja remover a encomenda?'
    );

    if (removeConfirm) {
      await api.put(`/problem/${id}/cancel-delivery`, {
        canceled_at,
      });
    }
    document.location.reload(false);
  }

  return (
    <Container>
      <header>
        <div>
          <strong>Problemas na entrega</strong>
        </div>
      </header>
      <Table>
        <thead>
          <tr>
            <td>ID</td>
            <td>Problema</td>
            <td>Status</td>
            <td>Ações</td>
          </tr>
        </thead>
        {problem.length ? (
          problem.map(data => (
            <tbody key={data.id}>
              <td>{`#${data.id}`}</td>
              <td>{data.description}</td>
              <td>
                <StatusColor status={data.delivery.status} />
              </td>
              <td>
                <StatusMenu
                  isOpen={modalIsOpen}
                  onRequestClose={closeModal}
                  ariaHideApp={false}
                >
                  <li>
                    <button
                      type="button"
                      onClick={() => handleShow(data.delivery_id)}
                    >
                      <MdRemoveRedEye size={20} color="#8E5BE8" />
                      Visualizar
                    </button>
                  </li>
                  <li>
                    <button type="button">
                      <Link
                        to="/delivery-problem"
                        onClick={() => handleRemove(data.id)}
                      >
                        <MdDeleteForever size={20} color="#DE3B3B" />
                        Cancelar encomenda
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

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
      >
        <span>Visualizar problema</span>
        {problemModal.map(data => (
          <ul>
            <li>{data.description}</li>
          </ul>
        ))}
      </Modal>
    </Container>
  );
}
