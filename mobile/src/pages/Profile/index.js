import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { parseISO, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { signOut } from '~/store/modules/auth/actions';

import { Container, Label, Strong, LogoutButton, Image } from './styles';

import api from '~/services/api';

export default function Profile() {
  const [deliveryMan, setDeliveryMan] = useState([]);
  const deliveryManId = useSelector((state) => state.auth.id);

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadDeliveryMan() {
      const response = await api.get(`deliverymans/${deliveryManId}`);

      const data = {
        ...response.data,
        initialName: response.data.name.replace(/\s/g, '+'),
        formattedDate: format(parseISO(response.data.createdAt), 'dd/MM/yyyy', {
          ptBR,
        }),
        avatarURL: response.data.avatar.url.replace('localhost', '192.168.0.5'),
      };

      setDeliveryMan(data);
    }
    loadDeliveryMan();
  }, []);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Image
        source={{
          uri:
            deliveryMan.avatarURL ||
            `https://ui-avatars.com/api/?size=140&background=f4effc&color=a28fd0&name=${deliveryMan.initialName}`,
        }}
      />

      <Label>Nome Completo</Label>
      <Strong>{deliveryMan.name}</Strong>
      <Label>Email</Label>
      <Strong>{deliveryMan.email}</Strong>
      <Label>Data de cadastro</Label>
      <Strong>{deliveryMan.formattedDate}</Strong>
      <LogoutButton onPress={handleSignOut}>Logout</LogoutButton>
    </Container>
  );
}
