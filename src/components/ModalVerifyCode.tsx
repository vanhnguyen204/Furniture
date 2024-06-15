import React, {useEffect, useRef, useState} from 'react';
import {KeyboardAvoidingView, Modal, Platform, TextInput} from 'react-native';
import Box from './Box.tsx';
import TextComponent from './TextComponent.tsx';
import {appColors} from '../assets/colors/appColors.ts';
import InputComponent from './InputComponent.tsx';
import ButtonComponent from './ButtonComponent.tsx';
interface ModalVerifyCodeProps {
  visible: boolean;
  onConfirm: (code: string) => void;
  onClose: () => void;
}
const ModalVerifyCode = (props: ModalVerifyCodeProps) => {
  const {visible, onConfirm, onClose} = props;
  const [code, setCode] = useState('');
  const inputRef = useRef<TextInput>(null);
  useEffect(() => {
    if (inputRef.current && visible) {
      inputRef.current.focus();
      setCode('');
    }
  }, [visible]);
  return (
    <Modal visible={visible} transparent={true} animationType={'fade'}>
      <Box
        flex={1}
        justifyContent={'center'}
        backgroundColor={'rgba(0, 0, 0, 0.2)'}>
        <Box
          radius={20}
          backgroundColor={appColors.white}
          padding={20}
          marginHorizontal={40}>
          <TextComponent
            fontSize={24}
            alignSelf={'center'}
            value={'Verify code'}
            color={appColors.black900}
          />
          <Box
            padding={10}
            borderWidth={1}
            borderColor={appColors.grays.gray500}
            marginVertical={10}
            radius={10}>
            <InputComponent
              inputRef={inputRef}
              keyboardType={'numeric'}
              onChangeText={setCode}
              value={code}
              placeholderTextColor={appColors.grays.gray500}
              placeholder={'Enter code'}
              textColor={appColors.black900}
            />
          </Box>
          <Box flexDirection={'row'}>
            <ButtonComponent
              flex={1}
              alignItems={'center'}
              name={'Cancel'}
              backgroundColor={appColors.grays.gray500}
              onPress={onClose}
            />
            <ButtonComponent
              marginLeft={10}
              flex={1}
              alignItems={'center'}
              backgroundColor={appColors.black900}
              name={'Confirm'}
              onPress={() => {
                onConfirm(code);
              }}
            />
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalVerifyCode;
