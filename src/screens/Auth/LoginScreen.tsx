import React, {useCallback, useEffect, useState} from 'react';
import Container from '../../components/Container.tsx';
import Box from '../../components/Box.tsx';
import {Alert, Image, View} from 'react-native';
import ImageComponent from '../../components/ImageComponent.tsx';
import {appColors} from '../../assets/colors/appColors.ts';
import TextComponent from '../../components/TextComponent.tsx';
import InputComponent from '../../components/InputComponent.tsx';
import ButtonComponent from '../../components/ButtonComponent.tsx';
import {navigatePush, navigateReplace} from '../../utils/navigationUtils.ts';
import {PageName} from '../../config/pageName.ts';
import {useAuth} from '../../hooks/useAuth.ts';
import {validateEmail, validatePass} from '../../utils/validate.ts';
import {login} from '../../services/api/auth.ts';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ACCESS_TOKEN, ACCESS_USER_ID} from '../../constants/AsyncStorage.ts';
import {
  fetchAllData,
  fetchFavoriteProductsByUser,
} from '../../services/api/product.ts';
import {useStoreGlobal} from '../../hooks/useStoreGlobal.ts';
import {useUserInformation} from '../../hooks/useUserInformation.ts';

export const LoginScreen = () => {
  const navigation = useNavigation();
  const {setProducts} = useStoreGlobal();
  const {setMyFavorites} = useUserInformation();
  const [isSecurePass, setIsSecurePass] = useState(true);
  const {
    email,
    passWord,
    setEmail,
    setPassword,
    setErrorEmail,
    setErrorPassword,
    errorEmail,
    errorPassword,
  } = useAuth();
  const onEmailChange = (value: string) => {
    setEmail(value);
    setErrorEmail(validateEmail(value));
  };
  const onPassChange = (value: string) => {
    setPassword(value);
    setErrorPassword(validatePass(value));
  };
  const handleLogin = useCallback(async () => {
    if (email.trim().length !== 0 || passWord.trim().length !== 0) {
      login(email, passWord)
        .then(async res => {
          // @ts-ignore
          if (res?.error) {
            // @ts-ignore
            Alert.alert('Thông báo', res.error);
            return;
          }
          try {
            // @ts-ignore
            const {token, ...rest} = res;
            await AsyncStorage.setItem(ACCESS_TOKEN, token);
            // @ts-ignore
            await AsyncStorage.setItem(ACCESS_USER_ID, rest.user._id);
            const fetchDataRes = await fetchAllData();
            // @ts-ignore
            setProducts(fetchDataRes);
            const fetchFavorite = await fetchFavoriteProductsByUser(
              // @ts-ignore
              rest.user._id,
            );
            setMyFavorites(fetchFavorite);
            navigateReplace('BottomTab');
            setErrorEmail('');
            setErrorPassword('');
            setEmail('');
            setPassword('');
          } catch (e) {
            console.log(e);
          }
        })
        .catch(e => {
          console.log(e);
          Alert.alert(
            'Mất kết nối',
            'Vui lòng kiểm tra đường truyền và thử lại.',
          );
        });
    } else {
      setErrorEmail(validateEmail(email));
      setErrorPassword(validatePass(passWord));
    }
  }, [
    email,
    passWord,
    setEmail,
    setErrorEmail,
    setErrorPassword,
    setMyFavorites,
    setPassword,
    setProducts,
  ]);
  useEffect(() => {
    const sub = navigation.addListener('focus', () => {
      setErrorEmail('');
      setErrorPassword('');
    });
    return () => {
      sub();
    };
  }, [navigation, setErrorEmail, setErrorPassword]);
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
            autoCapitalize={'none'}
            marginBottom={10}
            value={email}
            textColor={appColors.black900}
            onChangeText={onEmailChange}
          />
          <Box
            height={1}
            alignSelf={'stretch'}
            backgroundColor={appColors.grays.gray500}
          />
          {errorEmail && (
            <TextComponent
              color={appColors.red}
              marginTop={5}
              value={errorEmail}
            />
          )}
          <TextComponent
            value={'Password'}
            fontWeight={'400'}
            lineHeight={19}
            color={appColors.grays.gray700}
            marginVertical={20}
          />
          <Box flexDirection={'row'}>
            <InputComponent
              isSecure={isSecurePass}
              style={{flex: 1}}
              value={passWord}
              textColor={appColors.black900}
              onChangeText={onPassChange}
            />
            <ButtonComponent
              name={'toggle pass'}
              onPress={() => {
                setIsSecurePass(prevState => !prevState);
              }}>
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
          {errorPassword && (
            <TextComponent
              value={errorPassword}
              color={appColors.red}
              marginTop={5}
            />
          )}
          <ButtonComponent
            name={'Forgot password ?'}
            onPress={() => {}}
            nameColor={appColors.black900}
            alignSelf={'flex-end'}
          />
          <ButtonComponent
            name={'Login'}
            onPress={handleLogin}
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
              navigatePush('Register');
            }}
            nameColor={appColors.black900}
            alignSelf={'center'}
          />
        </View>
      </Box>
    </Container>
  );
};
