import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from 'react-native';
import React, {useCallback} from 'react';
import Container from '../../components/Container';
import ButtonComponent from '../../components/ButtonComponent';
import Box from '../../components/Box';
import ImageComponent from '../../components/ImageComponent';
import {appColors} from '../../assets/colors/appColors';
import TextComponent from '../../components/TextComponent';
import InputComponent from '../../components/InputComponent';
import {goBackNavigation} from '../../utils/navigationUtils';
import {globalStyle} from '../../styles/globalStyle';
import {useAuth} from '../../hooks/useAuth';
import {
  validateConfirmPass,
  validateEmail,
  validateFullName,
  validatePass,
} from '../../utils/validate';

const SignUpScreen = () => {
  const {
    email,
    passWord,
    confirmPassword,
    name,
    errorName,
    errorEmail,
    errorPassword,
    errorConfirmPassword,
    setName,
    setEmail,
    setConfirmPassword,
    setPassword,
    setErrorName,
    setErrorEmail,
    setErrorPassword,
    setErrorConfirmPassword,
  } = useAuth();

  const onNameChange = useCallback(
    (value: string) => {
      setName(value);
      setErrorName(validateFullName(value));
    },
    [setErrorName, setName],
  );
  const onEmailChange = useCallback(
    (value: string) => {
      setEmail(value);
      setErrorEmail(validateEmail(value));
    },
    [setEmail, setErrorEmail],
  );
  const onPassChange = useCallback(
    (value: string) => {
      setPassword(value);
      setErrorPassword(validatePass(value));
    },
    [setErrorPassword, setPassword],
  );
  const onConfirmPassChange = useCallback(
    (value: string) => {
      setConfirmPassword(value);
      setErrorConfirmPassword(validateConfirmPass(passWord, value));
    },
    [passWord, setConfirmPassword, setErrorConfirmPassword],
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[globalStyle.containerStyle]}
      keyboardVerticalOffset={Platform.select({ios: 0, android: 500})}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container flex={1}>
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
                value={'WELCOME'}
                fontSize={30}
                fontWeight={'400'}
                color={appColors.black900}
                fontFamily={'Feather'}
                lineHeight={45}
              />
            </Box>
            <View style={styles.formContainer}>
              <TextComponent
                value={'Name'}
                fontWeight={'400'}
                lineHeight={19}
                color={appColors.grays.gray700}
                marginBottom={20}
              />
              <InputComponent
                marginBottom={10}
                value={name}
                textColor={appColors.black900}
                onChangeText={onNameChange}
              />
              <Box
                height={1}
                alignSelf={'stretch'}
                backgroundColor={appColors.grays.gray500}
              />
              {errorName.length !== 0 && (
                <TextComponent color={appColors.red} value={errorName} />
              )}
              <TextComponent
                marginVertical={20}
                value={'Email'}
                fontWeight={'400'}
                lineHeight={19}
                color={appColors.grays.gray700}
                marginBottom={20}
              />
              <InputComponent
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
              {errorEmail.length !== 0 && (
                <TextComponent color={appColors.red} value={errorEmail} />
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
                  style={{flex: 1}}
                  value={passWord}
                  textColor={appColors.black900}
                  onChangeText={onPassChange}
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
              {errorPassword.length !== 0 && (
                <TextComponent color={appColors.red} value={errorPassword} />
              )}
              <TextComponent
                value={'Confirm password'}
                fontWeight={'400'}
                lineHeight={19}
                color={appColors.grays.gray700}
                marginVertical={20}
              />
              <Box flexDirection={'row'}>
                <InputComponent
                  style={{flex: 1}}
                  value={confirmPassword}
                  textColor={appColors.black900}
                  onChangeText={onConfirmPassChange}
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
              {errorConfirmPassword.length !== 0 && (
                <TextComponent
                  color={appColors.red}
                  value={errorConfirmPassword}
                />
              )}
              <ButtonComponent
                marginTop={20}
                name={'Sign up'}
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
                name={'Already have an account? Login'}
                fontSize={16}
                padding={10}
                onPress={() => {
                  goBackNavigation();
                }}
                nameColor={appColors.black900}
                alignSelf={'center'}
              />
            </View>
          </Box>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  formContainer: {
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
  },
});
export default SignUpScreen;
