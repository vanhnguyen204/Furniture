import React from 'react';
import Box from './Box.tsx';
import ButtonComponent from './ButtonComponent.tsx';
import ImageComponent from './ImageComponent.tsx';
import {appColors} from '../assets/colors/appColors.ts';
interface CheckBoxProps {
  isChecked: boolean;
  onCheck: (value: boolean) => void;
}
const CheckBox = (props: CheckBoxProps) => {
  const {isChecked, onCheck} = props;
  return (
    <ButtonComponent
      padding={5}
      name={'CheckBox'}
      onPress={() => onCheck(!isChecked)}
      backgroundColor={appColors.black900}
      borderRadius={5}
      alignSelf={'flex-start'}>
      <ImageComponent
        src={require('../assets/icons/tick.png')}
        height={15}
        width={15}
        opacity={isChecked ? 1 : 0}
        tintColor={appColors.white}
      />
    </ButtonComponent>
  );
};

export default CheckBox;
