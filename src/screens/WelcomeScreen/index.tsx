import React, {useCallback, useState} from 'react';
import Container from '../../components/Container.tsx';
import {ActivityIndicator, Alert, ImageBackground} from 'react-native';
import TextComponent from '../../components/TextComponent.tsx';
import {appColors} from '../../assets/colors/appColors.ts';
import ButtonComponent from '../../components/ButtonComponent.tsx';
import {navigateReplace} from '../../utils/navigationUtils.ts';
import {PageName} from '../../config/pageName.ts';
import {
  fetchAllData,
  fetchFavoriteProductsByUser,
} from '../../services/api/product.ts';
import {useStoreGlobal} from '../../hooks/useStoreGlobal.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ACCESS_TOKEN} from '../../constants/AsyncStorage.ts';
import {useUserInformation} from '../../hooks/useUserInformation.ts';
import {getUserInfor} from '../../services/api/auth.ts';
import { User } from "../../models/User.ts";

const WelcomeScreen = () => {
  const {setProducts} = useStoreGlobal();
  const {setInfor} = useUserInformation();
  const [isLoading, setIsLoading] = useState(false);
  const handleGetstarted = useCallback(async () => {
    setIsLoading(true);
    try {
      const checkToken = await AsyncStorage.getItem(ACCESS_TOKEN);
      if (checkToken === null) {
        navigateReplace('Login');
      } else {
        navigateReplace('BottomTab');
        getUserInfor()
          .then(res => {
            setInfor(res);
          })
          .catch(e => {
            console.log(e);
          });
      }

      const fetchDataRes = await fetchAllData();
      // @ts-ignore
      setProducts(fetchDataRes);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }, [setProducts]);
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
            handleGetstarted();
          }}
          padding={10}
          borderRadius={10}
          alignSelf={'center'}
          fontSize={18}
          marginTop={150}
          fontWeight={'600'}
          paddingHorizontal={20}
          backgroundColor={appColors.black900}>
          {isLoading ? (
            <ActivityIndicator color={appColors.white} size={'small'} />
          ) : (
            <TextComponent value={'Get started'} />
          )}
        </ButtonComponent>
      </Container>
    </ImageBackground>
  );
};

export default WelcomeScreen;
