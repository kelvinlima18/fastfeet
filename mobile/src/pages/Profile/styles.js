import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  padding: 36px;
  background: #fff;
`;

export const Image = styled.Image`
  height: 137px;
  width: 137px;
  border-radius: 68.5px;
  background: #f4effc;
  margin: 60px 0 40px 0;
  justify-content: center;
  align-self: center;
`;

export const Label = styled.Text`
  color: #666;
  font-size: 12px;
`;

export const Strong = styled.Text`
  color: #444;
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 15px;
`;

export const LogoutButton = styled(Button)`
  background: #e74040;
  margin-top: 15px;
`;
