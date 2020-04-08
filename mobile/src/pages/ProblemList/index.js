import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { View } from 'react-native';

import {
  Container,
  Content,
  Title,
  ListProblems,
  ListProblem,
  Description,
  Date,
} from './styles';

import api from '~/services/api';

export default function ProblemList({ navigation }) {
  const id = navigation.getParam('deliveryData');
  const [problem, setProblem] = useState([]);
  const [product, setProduct] = useState('');

  useEffect(() => {
    async function loadProblem() {
      const response = await api.get(`delivery/${id}/problems`);

      const data = response.data.map((item) => ({
        ...item,
        formattedDate: format(parseISO(item.createdAt), 'dd/MM/yyyy', {
          ptBR,
        }),
      }));

      setProblem(data);
    }

    async function loadDelivery() {
      const response = await api.get(`deliveries/${id}`);

      setProduct(response.data.product);
    }

    loadDelivery();
    loadProblem();
  }, []);

  return (
    <>
      <View style={{ backgroundColor: '#7d40e7', height: 100 }} />
      <Container>
        <Content>
          <Title>{product}</Title>
          {problem.map((item) => (
            <ListProblems key={item.id}>
              <ListProblem>
                <Date>{item.formattedDate}</Date>
                <Description>{item.description}</Description>
              </ListProblem>
            </ListProblems>
          ))}
        </Content>
      </Container>
    </>
  );
}

ProblemList.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
};
