import styled from 'styled-components';
import ReactModal from 'react-modal';

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
    }
  }
`;

export const Modal = styled(ReactModal).attrs(() => ({
  style: {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      display: 'flex',
    },
    content: {
      backgroundColor: '#fff',
      display: 'flex',
      flexDirection: 'column',
      padding: '30px',
      borderRadius: '4px',
      width: '450px',
      margin: 'auto',
    },
  },
}))`
  span {
    font-weight: bold;
    font-size: 14px;
  }

  ul {
    margin-top: 20px;
    font-size: 16px;
  }
`;
