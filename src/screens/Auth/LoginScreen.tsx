import React from 'react';
import Container from '../../components/Container.tsx';
import Box from '../../components/Box.tsx';
import {Image, View} from 'react-native';
import ImageComponent from '../../components/ImageComponent.tsx';
import {appColors} from '../../assets/colors/appColors.ts';
import TextComponent from '../../components/TextComponent.tsx';
import InputComponent from '../../components/InputComponent.tsx';
import ButtonComponent from '../../components/ButtonComponent.tsx';
import {navigatePush} from '../../utils/navigationUtils.ts';
import {PageName} from '../../config/pageName.ts';

export const LoginScreen = () => {
  return (
    <Container>
      <Box padding={20} flex={1}>
        <Box
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'center'}>
          <Box
            width={120}
            height={1}
            backgroundColor={appColors.grays.gray500}
          />
          <Box
            marginHorizontal={20}
            radius={99}
            borderWidth={1}
            borderColor={appColors.black900}
            padding={10}>
            <ImageComponent
              width={45}
              height={45}
              src={require('../../assets/icons/sofa.png')}
            />
          </Box>
          <Box
            width={120}
            height={1}
            backgroundColor={appColors.grays.gray500}
          />
        </Box>
        <Box>
          <TextComponent
            value={'Hello !'}
            fontSize={24}
            fontWeight={'700'}
            color={appColors.grays.gray600}
            fontFamily={'Feather'}
            lineHeight={45}
          />
          <TextComponent
            value={'WELCOME BACK'}
            fontSize={30}
            fontWeight={'400'}
            color={appColors.black900}
            fontFamily={'Feather'}
            lineHeight={45}
          />
        </Box>
        <View
          style={{
            flex: 1,
            shadowColor: appColors.black900,
            backgroundColor: appColors.white,
            marginLeft: -20,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            padding: 20,
            shadowOffset: {width: 5, height: 5},
            shadowOpacity: 0.3,
            marginTop: 20,
          }}>
          <TextComponent
            value={'Email'}
            fontWeight={'400'}
            lineHeight={19}
            color={appColors.grays.gray700}
            marginBottom={20}
          />
          <InputComponent
            marginBottom={10}
            value={'email'}
            textColor={appColors.black900}
            onChangeText={() => {}}
          />
          <Box
            height={1}
            alignSelf={'stretch'}
            backgroundColor={appColors.grays.gray500}
          />
          <TextComponent
            value={'Password'}
            fontWeight={'400'}
            lineHeight={19}
            color={appColors.grays.gray700}
            marginVertical={20}
          />
          <Box flexDirection={'row'}>
            <InputComponent
              style={{flex: 1}}
              value={'pass'}
              textColor={appColors.black900}
              onChangeText={() => {}}
            />
            <ButtonComponent name={'toggle pass'} onPress={() => {}}>
              <ImageComponent
                src={require('../../assets/icons/view.png')}
                height={20}
                width={20}
              />
            </ButtonComponent>
          </Box>
          <Box
            height={1}
            alignSelf={'stretch'}
            backgroundColor={appColors.grays.gray500}
          />
          <ButtonComponent
            name={'Forgot password ?'}
            onPress={() => {}}
            nameColor={appColors.black900}
            alignSelf={'flex-end'}
          />
          <ButtonComponent
            name={'Login'}
            onPress={() => {}}
            nameColor={appColors.white}
            alignSelf={'stretch'}
            alignItems={'center'}
            padding={10}
            fontSize={18}
            borderRadius={10}
            fontWeight={'600'}
            backgroundColor={appColors.black900}
          />
          <ButtonComponent
            name={'Sign up'}
            fontSize={18}
            padding={10}
            fontWeight={'600'}
            onPress={() => {
              navigatePush(PageName.Register);
            }}
            nameColor={appColors.black900}
            alignSelf={'center'}
          />
        </View>
      </Box>
    </Container>
  );
};
