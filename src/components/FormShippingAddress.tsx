import React, {useCallback, useEffect, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import Box from './Box.tsx';
import TextComponent from './TextComponent.tsx';
import InputComponent from './InputComponent.tsx';
import {appColors} from '../assets/colors/appColors.ts';
import {globalStyle} from '../styles/globalStyle.ts';
import ButtonComponent from './ButtonComponent.tsx';
import Address from '../models/Address.ts';

interface ItemType {
  label: string;
  value: string;
  onInputChange: (label: string, index: number, value: string) => void;
  index: number;
}

interface FormShippingAddressProps {
  feats: string[];
  isVisible: boolean;
  onClose: () => void;
  title: string;
  onConfirm: (newAddress: Address, initialValues?: Address) => void;
  initialValues?: Address;
}

const FormShippingAddress = (props: FormShippingAddressProps) => {
  const {feats, isVisible, onClose, title, onConfirm, initialValues} = props;
  const [inputValues, setInputValues] = useState<Address>({
    _id: '',
    country: '',
    city: '',
    district: '',
    addressDetail: '',
    recipient: '',
    isSelected: false,
  });
  useEffect(() => {
    if (initialValues) {
      setInputValues(prevState => ({
        ...prevState,
        city: initialValues.city,
        country: initialValues.country,
        district: initialValues.district,
        addressDetail: initialValues.addressDetail,
        recipient: initialValues.recipient,
      }));
    }
  }, [initialValues]);
  const resetInputValues = () => {
    setInputValues(prevState => ({
      ...prevState,
      _id: '',
      country: '',
      city: '',
      district: '',
      addressDetail: '',
      recipient: '',
      isSelected: false,
    }));
  };

  const handleOnClose = () => {
    resetInputValues();
    onClose();
  };

  const onInputChange = useCallback(
    (label: string, index: number, value: string) => {
      setInputValues(prevState => ({
        ...prevState,
        [label]: value,
      }));
    },
    [],
  );

  const handleConfirm = () => {
    onConfirm(inputValues, initialValues);
    resetInputValues();
    onClose();
  };

  return (
    <Modal visible={isVisible} transparent={true} animationType={'fade'}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[globalStyle.containerStyle]}
        keyboardVerticalOffset={Platform.select({ios: 0, android: 500})}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Box
            flex={1}
            justifyContent={'center'}
            backgroundColor={appColors.transparent}>
            <Box
              radius={20}
              backgroundColor={appColors.brown}
              marginHorizontal={20}
              padding={20}>
              <TextComponent
                value={title}
                alignSelf={'center'}
                fontSize={20}
                marginBottom={20}
              />
              {feats.map((item, index) => {
                return (
                  <ItemForm
                    key={index}
                    label={item}
                    index={index}
                    // @ts-ignore
                    value={inputValues[item]}
                    onInputChange={onInputChange}
                  />
                );
              })}
              <Box flexDirection={'row'}>
                <ButtonComponent
                  flex={1}
                  alignItems={'center'}
                  justifyContent={'center'}
                  name={'Close'}
                  onPress={handleOnClose}
                />
                <ButtonComponent
                  flex={1}
                  alignItems={'center'}
                  justifyContent={'center'}
                  backgroundColor={appColors.white}
                  name={'Confirm'}
                  nameColor={appColors.black900}
                  onPress={handleConfirm}
                />
              </Box>
            </Box>
          </Box>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const ItemForm = (props: ItemType) => {
  const {label, value, index, onInputChange} = props;
  const upperCase = (value: String): string => {
    let sub = value.substring(0, 1).toUpperCase();
    let end = value.substring(1, value.length).toLowerCase();
    return sub.concat('', end);
  };
  return (
    <Box>
      <TextComponent
        value={upperCase(label)}
        color={appColors.black900}
        marginBottom={5}
      />
      <InputComponent
        style={{borderWidth: 1, padding: 10, borderRadius: 10}}
        value={value}
        onChangeText={(text: string) => onInputChange(label, index, text)}
        placeholder={upperCase(label)}
        placeholderTextColor={appColors.grays.gray400}
        marginBottom={10}
      />
    </Box>
  );
};

export default FormShippingAddress;
