import {
  View,
  TextInput,
  TextInputProps,
  ViewStyle,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {memo, Ref} from 'react';
import {appColors} from '../assets/colors/appColors';
import {globalStyle} from '../styles/globalStyle.ts';
interface InputProps extends TextInputProps {
  value: string;
  onChangeText: (value: string) => void;
  flex?: number;
  isSecure?: boolean;
  placeholder?: string;
  placeholderTextColor?: string;
  borderRadius?: number;
  padding?: number;
  margin?: number;
  marginVertical?: number;
  marginHorizontal?: number;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  marginBottom?: number;
  textColor?: string;
  style?: ViewStyle;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
  inputRef?: Ref<TextInput>;
}
const InputComponent = (props: InputProps) => {
  const {
    value,
    onChangeText,
    placeholder,
    placeholderTextColor,
    textColor,
    style,
    flex,
    autoCapitalize,
    inputRef,
    isSecure,
    ...resProps
  } = props;
  return (
    <TextInput
      secureTextEntry={isSecure}
      ref={inputRef}
      {...resProps}
      style={[{color: textColor ?? appColors.white, flex: flex}, style]}
      value={value}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      onChangeText={onChangeText}
      autoCapitalize={autoCapitalize}
    />
  );
};
export default memo(InputComponent);
