import React from 'react';
import PropTypes from 'prop-types';

import { ActivityIndicator } from 'react-native';

import { Container } from './styles';

export default function Loading({ loading }) {
  return loading ? (
    <Container>
      <ActivityIndicator color="#7d40e7" size={40} />
    </Container>
  ) : null;
}

Loading.propTypes = {
  loading: PropTypes.bool,
};

Loading.defaultProps = {
  loading: false,
};
