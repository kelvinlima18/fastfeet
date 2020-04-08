import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { View, StatusBar, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Container,
  Content,
  Camera,
  CameraView,
  CameraButton,
  SubmitButton,
} from './styles';

import api from '~/services/api';

export default function Signature({ navigation }) {
  const id = navigation.getParam('deliveryData');
  const [camera, setCamera] = useState(null);
  const [file, setFile] = useState('');

  async function takePicture() {
    if (camera) {
      const options = { quality: 0.5, base64: true, width: 800 };
      const data = await camera.takePictureAsync(options);

      await setFile(data.uri);
    }
  }

  async function handlePicture() {
    const picture = new FormData();

    picture.append('file', {
      type: 'image/jpg',
      uri: file,
      name: 'received.jpg',
    });

    const resPicture = await api.post('signatures', picture);

    const resDelivery = await api.get(`deliveries/${id}`);

    await api.put(
      `/deliverymans/${resDelivery.data.deliveryman_id}/deliveries/${id}/complete`,
      {
        signature_id: resPicture.data.id,
      }
    );

    navigation.navigate('Main');
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7d40e7" />
      <View style={{ backgroundColor: '#7d40e7', height: 100 }} />
      <Container>
        <Content>
          {file ? (
            <CameraView>
              <Image source={{ uri: file }} style={{ height: '100%' }} />
            </CameraView>
          ) : (
            <CameraView>
              <Camera
                ref={(ref) => {
                  setCamera(ref);
                }}
                type={Camera.Constants.Type.back}
                autoFocus={Camera.Constants.AutoFocus.on}
                flashMode={Camera.Constants.FlashMode.off}
                androidCameraPermissionOptions={{
                  title: 'Permissao para usar a camera',
                  message:
                    'Precisamos da sua permissão para utilizar a camera do seu telefone',
                  buttonPositive: 'Ok',
                  buttonNegative: 'Cancel',
                }}
              />
              <CameraButton onPress={takePicture}>
                <Icon name="camera-alt" size={30} color="#FFF" />
              </CameraButton>
            </CameraView>
          )}

          <SubmitButton onPress={handlePicture}>Enviar</SubmitButton>
        </Content>
      </Container>
    </>
  );
}

Signature.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    getParam: PropTypes.func,
  }).isRequired,
};
