import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;

  header {
    display: flex;
    flex-direction: column;
    margin-top: 34px;

    strong {
      font-size: 24px;
      font-weight: bold;
    }

    .btn-input {
      display: flex;
      justify-content: space-between;
      margin-top: 34px;
    }

    .input {
      display: flex;
      flex-direction: row;
      border: 1px solid #ddd;
      border-radius: 5px;
      background: #fff;

      svg {
        float: left;
        margin: 8px 0 0 8px;
        color: #999;
      }
    }

    input {
      display: flex;
      height: 36px;
      width: 237px;
      border-radius: 5px;
      border: 0;
      float: left;
      padding-left: 8px;
    }

    button {
      display: flex;
      height: 36px;
      width: 142px;
      border: 0;
      border-radius: 5px;
      background: #7d40e7;
      color: #fff;
      font-weight: bold;
      padding: 0;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      transition: background 0.2s;

      svg {
        margin-right: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      &:hover {
        background: ${darken(0.05, '#7d40e7')};
      }
    }
  }
`;

export const Table = styled.table`
  margin-top: 22px;
  width: 100%;
  border-spacing: 0 21px;

  thead {
    font-size: 16px;
    text-align: left;
    color: #444;
    opacity: 1;
    font-weight: bold;

    tr td {
      padding: 14px 14px 0 14px;
    }
  }

  tbody {
    font-size: 16px;
    color: #666;
    background: #fff;
    border-collapse: collapse;

    td {
      border-radius: 5px;
      padding: 14px;
      flex-direction: row;

      .name {
        display: flex;
        flex-direction: row;
        text-align: center;
        align-items: center;
      }

      img {
        width: 35px;
        height: 35px;
        margin-right: 5px;
        border-radius: 50%;
      }
    }
  }
`;
