import {View, Text} from 'react-native';
import React from 'react';
import Container from '../../components/Container';
import Header from '../../components/Header';
import TextComponent from '../../components/TextComponent';
import Box from '../../components/Box';
import ImageComponent from '../../components/ImageComponent';
import {appColors} from '../../assets/colors/appColors';
import ButtonComponent from '../../components/ButtonComponent';
import {navigateAndReset} from '../../utils/navigationUtils';

const DonePurchase = () => {
  return (
    <Container justifyContent="center" alignItems="center">
      <TextComponent
        value="SUCCESS!"
        fontSize={36}
        color={appColors.black900}
      />
      <Box alignItems="center" justifyContent="center" marginVertical={20}>
        <ImageComponent
          src={require('../../assets/icons/done_background.png')}
          width={270}
          height={230}
        />
        <ImageComponent
          style={{position: 'absolute'}}
          src={require('../../assets/icons/done_image.png')}
          width={200}
          height={180}
          alignSelf="center"
        />
        <ImageComponent
          style={{position: 'absolute', bottom: -25}}
          src={require('../../assets/icons/done_icon.png')}
          width={50}
          height={50}
          alignSelf="center"
        />
      </Box>
      <Box marginVertical={20}>
        <TextComponent
          color={appColors.black900}
          value={
            'Your order will be delivered soon.' +
            '\n' +
            'Thank you for choosing our app!'
          }
        />
      </Box>
      <ButtonComponent
        alignSelf="stretch"
        name="Back to home"
        onPress={() => {
          navigateAndReset([{name: 'BottomTab'}]);
        }}
        backgroundColor={appColors.black900}
        paddingVertical={20}
        marginHorizontal={30}
        alignItems="center"
      />
    </Container>
  );
};

export default DonePurchase;
