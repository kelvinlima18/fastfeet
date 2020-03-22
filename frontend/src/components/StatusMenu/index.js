import React, { useState, useRef } from 'react';
import { MdList } from 'react-icons/md';
import PropTypes from 'prop-types';

import { Container, MenuList } from './styles';

export default function StatusMenu({ children }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef();

  function handleMenuVisible() {
    setVisible(!visible);
  }
  return (
    <Container>
      <button id="close" type="button" onClick={handleMenuVisible}>
        <MdList size={25} />
      </button>
      <MenuList ref={ref} visible={visible}>
        {children}
      </MenuList>
    </Container>
  );
}

StatusMenu.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired,
};
