import React, {useEffect, useRef, useState} from 'react';
import Container from '../../components/Container.tsx';
import Header from '../../components/Header.tsx';
import {
  goBackNavigation,
  navigateAndReset,
} from '../../utils/navigationUtils.ts';
import {appColors} from '../../assets/colors/appColors.ts';
import TextComponent from '../../components/TextComponent.tsx';
import Box from '../../components/Box.tsx';
import InputComponent from '../../components/InputComponent.tsx';
import ButtonComponent from '../../components/ButtonComponent.tsx';
import {
  changPassForgot,
  updateInfor,
  verifyEmail,
} from '../../services/api/auth.ts';
import {ActivityIndicator, TextInput} from 'react-native';
import {validateEmail, validatePass} from '../../utils/validate.ts';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../navigators/RootStackParamList.ts';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
type CheckoutScreenRouteProp = RouteProp<RootStackParamList, 'ChangePassword'>;
type CheckoutScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ChangePassword'
>;

type Props = {
  route: CheckoutScreenRouteProp;
  navigation: CheckoutScreenNavigationProp;
};
const ChangePass = (props: Props) => {
  const {email} = props.route.params;
  const inputRefPass = useRef<TextInput>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [errorPassword, setErrorPassword] = useState<string>('');
  useEffect(() => {
    if (inputRefPass.current) {
      inputRefPass.current.focus();
    }
  }, []);
  const onEmailChange = (value: string) => {
    setPassword(value);
    setErrorPassword(validatePass(value));
  };
  return (
    <Container>
      <Header
        iconLeft={require('../../assets/icons/left.png')}
        onLeftPress={() => goBackNavigation()}
        title={'Change password'}
        colorTitle={appColors.transparent}
      />
      <Box marginHorizontal={20}>
        <TextComponent
          value={'New password'}
          color={appColors.black900}
          fontSize={24}
        />
        <TextComponent
          value={'Enter new password.'}
          color={appColors.grays.gray500}
          marginVertical={10}
        />
        <Box
          borderWidth={1}
          radius={10}
          borderColor={appColors.black900}
          padding={10}>
          <TextComponent value={'Password'} color={appColors.black900} />
          <InputComponent
            isSecure={true}
            textColor={appColors.black900}
            inputRef={inputRefPass}
            value={password}
            onChangeText={onEmailChange}
          />
        </Box>
        {errorPassword && (
          <TextComponent
            value={errorPassword}
            color={appColors.red}
            marginTop={10}
          />
        )}

        <ButtonComponent
          marginTop={20}
          disabled={isLoading}
          alignItems={'center'}
          name={'Find'}
          onPress={() => {
            setIsLoading(true);
            changPassForgot(email, password)
              .then(res => {
                // @ts-ignore
                if (res.status === 200) {
                  navigateAndReset([{name: 'Login'}], 0);
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
            <TextComponent value={'Confirm'} />
          )}
        </ButtonComponent>
      </Box>
    </Container>
  );
};

export default ChangePass;
