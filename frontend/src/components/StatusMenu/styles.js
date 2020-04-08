import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  button {
    border: 0;
    background: none;
    color: #666;
    display: initial;
  }
`;

export const MenuList = styled.ul`
  position: absolute;
  width: 210px;
  left: calc(50% - 105px);
  top: calc(100% + 10px);
  background: #fff;
  border-radius: 5px;
  border: 1px solid #ddd;
  padding: 10px;
  display: ${props => (props.visible ? 'block' : 'none')};
  box-shadow: 0 0 10 rgba(0, 0, 0, 0.1);
  flex-direction: column;
  font-size: 16px;
  z-index: 5;

  li {
    & + li {
      margin-top: 5px;
      padding-top: 5px;
      border-top: 1px solid #eee;
      align-items: left;
    }

    button {
      width: 100%;
      display: flex;
      align-items: center;
      color: #444;
      font-size: 16px;

      a {
        color: #444;
        text-decoration: none;
      }

      &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }

      svg {
        margin-right: 10px;
      }
    }
  }
`;
