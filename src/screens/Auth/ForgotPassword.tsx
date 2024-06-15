import React, {useEffect, useRef, useState} from 'react';
import Container from '../../components/Container.tsx';
import Header from '../../components/Header.tsx';
import {goBackNavigation, navigatePush} from '../../utils/navigationUtils.ts';
import {appColors} from '../../assets/colors/appColors.ts';
import TextComponent from '../../components/TextComponent.tsx';
import Box from '../../components/Box.tsx';
import InputComponent from '../../components/InputComponent.tsx';
import {ActivityIndicator, Alert, TextInput} from 'react-native';
import ButtonComponent from '../../components/ButtonComponent.tsx';
import {validateEmail} from '../../utils/validate.ts';
import {verifyCode, verifyEmail} from '../../services/api/auth.ts';
import ModalVerifyCode from '../../components/ModalVerifyCode.tsx';

const ForgotPassword = () => {
  const inputRef = useRef<TextInput>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [errorEmail, setErrorEmail] = useState<string>('');
  const [modalVerifyCode, setModalVerifyCode] = useState<boolean>(false);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  const onEmailChange = (value: string) => {
    setEmail(value);
    setErrorEmail(validateEmail(value));
  };
  const toggleModalVerify = () => {
    setModalVerifyCode(prevState => !prevState);
  };
  return (
    <Container>
      <ModalVerifyCode
        visible={modalVerifyCode}
        onConfirm={(code: string) => {
          verifyCode(Number(code))
            .then(res => {
              // @ts-ignore
              if (res.status === 200) {
                navigatePush('ChangePassword', {email: email});
                toggleModalVerify();
              }
            })
            .catch(e => {
              console.log(e);
              Alert.alert(
                'Notification',
                'Error when verifying the code. Please try again',
              );
            });
        }}
        onClose={toggleModalVerify}
      />
      <Header
        iconLeft={require('../../assets/icons/left.png')}
        onLeftPress={() => goBackNavigation()}
        title={'Forgot password'}
        colorTitle={appColors.transparent}
      />
      <Box paddingHorizontal={20}>
        <TextComponent
          value={'Find account'}
          color={appColors.black900}
          fontSize={24}
        />
        <TextComponent
          value={'Enter email to find your account.'}
          color={appColors.black900}
          marginVertical={10}
        />
        <Box
          borderWidth={1}
          radius={10}
          borderColor={appColors.black900}
          padding={10}>
          <TextComponent value={'Email'} color={appColors.black900} />
          <InputComponent
            textColor={appColors.black900}
            inputRef={inputRef}
            value={email}
            onChangeText={onEmailChange}
          />
        </Box>
        {errorEmail && (
          <TextComponent
            value={errorEmail}
            color={appColors.red}
            marginTop={10}
          />
        )}
        <TextComponent
          marginVertical={10}
          color={appColors.grays.gray500}
          value={'We will send a confirmation code to your email.'}
        />
        <ButtonComponent
          disabled={isLoading}
          alignItems={'center'}
          name={'Find'}
          onPress={() => {
            setIsLoading(true);
            verifyEmail(email)
              .then(res => {
                // @ts-ignore
                if (res.status === 200) {
                  setModalVerifyCode(true);
                  setIsLoading(false);
                }
              })
              .catch(e => {
                console.log(e);
                setIsLoading(false);
              });
          }}
          nameColor={appColors.white}
          backgroundColor={appColors.black900}>
          {isLoading ? (
            <ActivityIndicator color={appColors.white} size={'small'} />
          ) : (
            <TextComponent value={'Find'} />
          )}
        </ButtonComponent>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
