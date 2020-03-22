import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { signOut } from '~/store/modules/auth/actions';

import { Container, Content, Profile } from './styles';

import logo from '~/assets/fastfeet-logo.png';

export default function Header() {
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <Link to="/delivery">
            <img src={logo} alt="FastFeet" />
          </Link>
          <li>
            <Link to="/delivery">ENCOMENDAS</Link>
          </li>
          <li>
            <Link to="/deliveryman">ENTREGADORES</Link>
          </li>
          <li>
            <Link to="/recipient">DESTINATÁRIOS</Link>
          </li>
          <li>
            <Link to="/delivery-problem">PROBLEMAS</Link>
          </li>
        </nav>
        <Profile>
          <strong>Admin FastFeet</strong>
          <Link to="/" onClick={handleSignOut}>
            sair do sistema
          </Link>
        </Profile>
      </Content>
    </Container>
  );
}
