import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    padding-right: 30px;
    border-right: 1px solid #f2f2f2;
    width: 210px;
    height: 30px;
  }

  nav {
    display: flex;
    align-items: center;
    list-style: none;

    li {
      position: relative;
      float: left;

      a {
        text-decoration: none;
        padding: 0 10px;
        font-size: 15px;
        color: #444444;
        font-weight: bold;
        transition: color 0.5s;

        &:hover {
          color: ${darken(0.08, '#7d40e7')};
          padding-bottom: 21px;
          border-bottom: 3px solid #7d40e7;
        }
      }
    }
  }
`;

export const Profile = styled.div`
  text-align: right;
  font-weight: bold;
  font-size: 14px;

  strong {
    display: block;
    color: #666666;
  }

  a {
    display: block;
    margin-top: 5px;
    color: #de3b3b;
    transition: color 0.5s;

    &:hover {
      color: #d95252;
    }
  }
`;
