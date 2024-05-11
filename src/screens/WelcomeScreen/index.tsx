import React from 'react';
import Container from '../../components/Container.tsx';
import {ImageBackground} from 'react-native';
import TextComponent from '../../components/TextComponent.tsx';
import {appColors} from '../../assets/colors/appColors.ts';
import ButtonComponent from '../../components/ButtonComponent.tsx';
import { navigate, navigatePush, navigateReplace } from "../../utils/navigationUtils.ts";
import {PageName} from '../../config/pageName.ts';

const WelcomeScreen = () => {
  return (
    <ImageBackground
      source={require('../../assets/images/backgroundWelcome.png')}
      style={{flex: 1}}>
      <Container justifyContent={'center'} alignItems={'flex-start'}>
        <TextComponent
          value={'MAKE YOUR'}
          fontSize={24}
          color={appColors.grays.gray450}
          fontWeight={'600'}
          marginHorizontal={20}
          fontFamily={'Feather'}
          lineHeight={30.47}
        />
        <TextComponent
          value={'HOME BEAUTIFUL'}
          fontSize={30}
          color={appColors.black900}
          fontWeight={'700'}
          marginHorizontal={20}
          marginTop={15}
          marginBottom={20}
          lineHeight={38.09}
        />
        <TextComponent
          value={
            'The best simple place where you discover most wonderful furnitures and make your home beautiful'
          }
          fontSize={18}
          lineHeight={35}
          fontWeight={'400'}
          marginHorizontal={20}
          fontFamily={'Feather'}
          alignSelf={'center'}
          color={appColors.grays.gray500}
        />
        <ButtonComponent
          name={'Get started'}
          onPress={() => {
            navigateReplace(PageName.Login);
          }}
          padding={10}
          borderRadius={10}
          alignSelf={'center'}
          fontSize={18}
          marginTop={150}
          fontWeight={'600'}
          paddingHorizontal={20}
          backgroundColor={appColors.black900}
        />
      </Container>
    </ImageBackground>
  );
};

export default WelcomeScreen;
