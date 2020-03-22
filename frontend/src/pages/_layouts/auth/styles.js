import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #7d40e7;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Content = styled.div`
  background: #fff;
  width: 100%;
  max-width: 360px;
  text-align: center;
  border-radius: 5px;
  margin: auto;

  img {
    margin: 60px 0 -20px 0;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    padding: 30px;

    label {
      font-weight: bold;
      font-size: 12px;
      text-align: left;
    }

    span {
      color: red;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }

    input {
      border: 1px solid #ddd;
      height: 44px;
      border-radius: 5px;
      padding: 15px;
      margin: 9px 0 15px 0;
    }

    button {
      border: 0;
      height: 44px;
      border-radius: 5px;
      background: #7d40e7;
      color: #fff;
      font-weight: bold;
      font-size: 16px;
      transition: background 0.9s;

      &:hover {
        background: ${darken(0.09, '#7d40e7')};
      }
    }
  }
`;
