import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Container, Input, Image } from './styles';
import Button from '~/components/Button';

import logo from '~/assets/logo.png';

import { signInRequest } from '~/store/modules/auth/actions';

export default function SignIn() {
  const dispatch = useDispatch();
  const [deliveryManId, setDeliveryManId] = useState('');

  const loading = useSelector((state) => state.auth.loading);

  function handleSubmit() {
    dispatch(signInRequest(deliveryManId));
  }

  return (
    <Container>
      <Image source={logo} />
      <Input
        type="text"
        keyboardType="number-pad"
        placeholder="Informe o seu ID de cadastro"
        returnKeyType="send"
        value={deliveryManId}
        onChangeText={setDeliveryManId}
        onSubmitEditing={handleSubmit}
      />
      <Button loading={loading} onPress={handleSubmit}>
        Entrar no sistema
      </Button>
    </Container>
  );
}
