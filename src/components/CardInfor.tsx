import React, {memo} from 'react';
import Box from './Box.tsx';
import TextComponent from './TextComponent.tsx';
import {appColors} from '../assets/colors/appColors.ts';
import {TextInput} from 'react-native';
interface CardInforProps {
  label: string;
  value: string;
  isPassWord: boolean;
  editable: boolean;
  onValueChange: (value: string) => void;
}
const CardInfor = (props: CardInforProps) => {
  const {label, isPassWord, editable, onValueChange, value} = props;
  return (
    <Box
      marginVertical={10}
      marginHorizontal={20}
      radius={10}
      backgroundColor={appColors.white}
      padding={15}>
      <TextComponent
        value={label}
        color={appColors.grays.gray500}
        marginBottom={5}
      />

      {isPassWord ? (
        <TextInput value={value} editable={editable} secureTextEntry={true} onChangeText={onValueChange} />
      ) : (
        <TextInput
          value={value}
          editable={editable}
          onChangeText={onValueChange}
        />
      )}
    </Box>
  );
};

export default memo(CardInfor);
