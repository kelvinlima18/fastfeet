import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { StatusBar, View, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Content,
  HeaderInformation,
  Title,
  DeliveryTitle,
  DeliveryData,
  HeaderStatus,
  DeliveryDates,
  DeliveryDate,
  DeliveryInformation,
  DeliveryStatus,
  MenuBottom,
  ActionButtom,
  ButtonTitle,
  ConfirmBox,
  ConfirmText,
} from './styles';

import Loading from '~/components/Loading';

import api from '~/services/api';

export default function DeliveryDetails({ navigation }) {
  const id = navigation.getParam('deliveryData');

  const [delivery, setDelivery] = useState([]);
  const [loadRecipient, setLoadRecipient] = useState([]);

  const [problem, setProblem] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadDelivery() {
      setLoading(true);

      const response = await api.get(`deliveries/${id}`);

      const { recipient } = response.data;

      const data = {
        ...response.data,
        formattedStartDate: response.data.start_date
          ? format(parseISO(response.data.start_date), 'dd / MM / yyyy', {
              ptBR,
            })
          : '- - / - - / - -',
        formattedEndDate: response.data.end_date
          ? format(parseISO(response.data.end_date), 'dd / MM / yyyy', {
              ptBR,
            })
          : '- - / - - / - -',
        completeAddress: `${recipient.street}, ${recipient.number} ${
          recipient.complement
            ? `- ${recipient.complement}, ${recipient.city}-${recipient.state}, ${recipient.cep}`
            : `, ${recipient.city}-${recipient.state}, ${recipient.cep}`
        }`,
      };

      setLoading(false);
      setDelivery(data);
      setLoadRecipient(data.recipient);
    }

    async function loadProblem() {
      const response = await api.get(`delivery/${id}/problems`);

      if (response.data.length > 0) {
        return setProblem(false);
      }

      return setProblem(true);
    }

    loadProblem();
    loadDelivery();
  }, [id]);

  async function handlePickup() {
    try {
      const response = await api.put(
        `deliverymans/${delivery.deliveryman_id}/deliveries/${delivery.id}`,
        {
          start_date: new Date(),
        }
      );

      if (response.status === 200) {
        ToastAndroid.show('Encomenda retirada com sucesso', ToastAndroid.SHORT);
      }
    } catch {
      ToastAndroid.show(
        'Falha na Retirada: Hoŕario não permitido OU Limite diário atingido',
        ToastAndroid.LONG
      );
    }
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7d40e7" />
      <View style={{ backgroundColor: '#7d40e7', height: 100 }} />
      <Container>
        {loading ? (
          <Loading loading={loading} />
        ) : (
          <>
            <Content>
              <DeliveryInformation>
                <HeaderInformation>
                  <Icon name="local-shipping" size={20} color="#7D40E7" />
                  <Title>Informações da Entrada</Title>
                </HeaderInformation>
                <DeliveryTitle>Destinatário</DeliveryTitle>
                <DeliveryData>{loadRecipient.name}</DeliveryData>
                <DeliveryTitle>Endereço de Entrega</DeliveryTitle>
                <DeliveryData>{delivery.completeAddress}</DeliveryData>
                <DeliveryTitle>Produto</DeliveryTitle>
                <DeliveryData>{delivery.product}</DeliveryData>
              </DeliveryInformation>
              <DeliveryStatus>
                <HeaderStatus>
                  <Icon name="event" size={20} color="#7D40E7" />
                  <Title>Situação da Entrega</Title>
                </HeaderStatus>
                <DeliveryTitle>Status</DeliveryTitle>
                <DeliveryData>{delivery.status}</DeliveryData>
                <DeliveryDates>
                  <DeliveryDate>
                    <DeliveryTitle>Data de Retirada</DeliveryTitle>
                    <DeliveryData>{delivery.formattedStartDate}</DeliveryData>
                  </DeliveryDate>
                  <DeliveryDate>
                    <DeliveryTitle>Data de Entrega</DeliveryTitle>
                    <DeliveryData>{delivery.formattedEndDate}</DeliveryData>
                  </DeliveryDate>
                </DeliveryDates>
              </DeliveryStatus>
              {delivery.end_date === null ? (
                <MenuBottom>
                  <ActionButtom
                    onPress={() => {
                      navigation.navigate('DeliveryProblem', {
                        deliveryData: delivery.id,
                      });
                    }}
                  >
                    <Icon name="highlight-off" size={24} color="#E74040" />
                    <ButtonTitle>Informar Problema</ButtonTitle>
                  </ActionButtom>
                  <ActionButtom
                    onPress={
                      problem
                        ? null
                        : () => {
                            navigation.navigate('ProblemList', {
                              deliveryData: delivery.id,
                            });
                          }
                    }
                    disabled={problem}
                  >
                    <Icon name="info-outline" size={24} color="#E7BA40" />
                    <ButtonTitle>Visualizar Problemas</ButtonTitle>
                  </ActionButtom>
                  <ActionButtom
                    onPress={
                      delivery.start_date === null
                        ? () => handlePickup()
                        : () => {
                            navigation.navigate('Signature', {
                              deliveryData: delivery.id,
                            });
                          }
                    }
                  >
                    {delivery.start_date === null ? (
                      <>
                        <Icon name="local-shipping" size={24} color="#7D40E7" />
                        <ButtonTitle>Retirar Encomenda</ButtonTitle>
                      </>
                    ) : (
                      <>
                        <Icon name="alarm-on" size={24} color="#67e25e" />
                        <ButtonTitle>Confirmar Entrega</ButtonTitle>
                      </>
                    )}
                  </ActionButtom>
                </MenuBottom>
              ) : (
                <ConfirmBox>
                  <ConfirmText>Entregue!!</ConfirmText>
                </ConfirmBox>
              )}
            </Content>
          </>
        )}
      </Container>
    </>
  );
}

DeliveryDetails.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    getParam: PropTypes.func,
  }).isRequired,
};
