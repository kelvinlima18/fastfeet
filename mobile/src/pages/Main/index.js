import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import { parseISO, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { StatusBar, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Header,
  Image,
  Welcome,
  Text,
  DelyveryMan,
  IconTag,
  Delivery,
  SubHeader,
  Title,
  DeliverieTitle,
  PendingTitle,
  Status,
  StatusHeader,
  TitleStatus,
  Details,
  RegisterTitle,
  Date,
  City,
  ButtonDetails,
  DetailsText,
} from './styles';

import { signOut } from '~/store/modules/auth/actions';

import ProgressBar from '~/components/ProgressBar';
import Loading from '~/components/Loading';

import api from '~/services/api';

export default function Main({ navigation }) {
  const deliveryManId = useSelector((state) => state.auth.id);
  const [deliveryMan, setDeliveryMan] = useState([]);
  const [delivery, setDelivery] = useState([]);

  const [activity, setActivity] = useState(1);
  const [status, setStatus] = useState('');

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  function handleShowDelivery() {
    setActivity(0);
    setStatus(true);
  }

  function handleShowPending() {
    setActivity(1);
    setStatus('');
  }

  function handleLogout() {
    dispatch(signOut());
  }

  useEffect(() => {
    async function loadDelivery() {
      setLoading(true);
      const response = await api.get(
        `/deliverymans/${deliveryManId}/deliveries?delivered=${status}`
      );

      const data = response.data.map((check) => ({
        ...check,
        formattedDate: format(parseISO(check.createdAt), 'dd/MM/yyyy', {
          ptBR,
        }),
      }));

      setLoading(false);
      setDelivery(data);
    }

    async function loadDeliveryMan() {
      const response = await api.get(`deliverymans/${deliveryManId}`);

      const data = {
        ...response.data,
        initialName: response.data.name.replace(/\s/g, '+'),
        avatarURL: response.data.avatar.url.replace('localhost', '192.168.0.5'),
      };

      setDeliveryMan(data);
    }

    loadDeliveryMan();
    loadDelivery();
  }, [status]);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Container>
        <Header>
          <Image
            source={{
              uri:
                deliveryMan.avatarURL ||
                `https://ui-avatars.com/api/?size=140&background=f4effc&color=a28fd0&name=${deliveryMan.initialName}`,
            }}
          />
          <Welcome>
            <Text>Bem vindo de volta,</Text>
            <DelyveryMan>{deliveryMan.name}</DelyveryMan>
          </Welcome>
          <IconTag
            onPress={handleLogout}
            name="exit-to-app"
            color="#E74040"
            size={25}
          />
        </Header>
        <Delivery>
          <SubHeader>
            <Title>Entregas</Title>
            <TouchableOpacity onPress={handleShowPending}>
              <PendingTitle status={activity}>Pendentes</PendingTitle>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleShowDelivery}>
              <DeliverieTitle status={activity}>Entregues</DeliverieTitle>
            </TouchableOpacity>
          </SubHeader>
          {loading ? (
            <Loading loading={loading} />
          ) : (
            delivery.map((item, index) => (
              <Status key={item.id}>
                <StatusHeader>
                  <Icon name="local-shipping" size={20} color="#7D40E7" />
                  <TitleStatus>
                    Encomenda{' '}
                    {`${index < 9 ? `0${index + 1}` : index + 1} - ${
                      item.product
                    }`}
                  </TitleStatus>
                </StatusHeader>
                <ProgressBar status={item.status} />
                <Details>
                  <View>
                    <RegisterTitle>Data</RegisterTitle>
                    <Date>{item.formattedDate}</Date>
                  </View>
                  <View>
                    <RegisterTitle>Cidade</RegisterTitle>
                    <City>{item.recipient.city}</City>
                  </View>
                  <ButtonDetails>
                    <DetailsText
                      onPress={() =>
                        navigation.navigate('DeliveryDetails', {
                          deliveryData: item.id,
                        })
                      }
                    >
                      Ver detalhes
                    </DetailsText>
                  </ButtonDetails>
                </Details>
              </Status>
            ))
          )}
        </Delivery>
      </Container>
    </>
  );
}

Main.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    getParam: PropTypes.func,
  }).isRequired,
};
