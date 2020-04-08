import React from 'react';
import PropTypes from 'prop-types';

import { Container, Bar, Step, Badge, Name } from './styles';

export default function ProgressBar({ status }) {
  const deliveryStatus = {
    pending: 0,
    ongoing: 1,
    complete: 2,
  };

  function handleStatus(statusName) {
    switch (statusName) {
      case 'ENTREGUE': {
        return deliveryStatus.complete;
      }
      case 'RETIRADO': {
        return deliveryStatus.ongoing;
      }
      case 'PENDENTE': {
        return deliveryStatus.pending;
      }
      default:
        return deliveryStatus.ongoing;
    }
  }

  const stepStatus = ['Aguardando Retirada', 'Retirado', 'Entregue'];

  return (
    <Container>
      <Bar />
      {stepStatus.map((step, index) => (
        <Step key={step}>
          <Badge complete={handleStatus(status) >= index} />
          <Name>{step}</Name>
        </Step>
      ))}
    </Container>
  );
}

ProgressBar.propTypes = {
  status: PropTypes.string.isRequired,
};
