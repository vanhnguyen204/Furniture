import {FlexStyle, TouchableOpacity, ViewStyle} from 'react-native';
import React, {memo, ReactNode} from 'react';
import TextComponent from './TextComponent';
import {appColors} from '../assets/colors/appColors';

interface ButtonProps extends FlexStyle {
  name?: string;
  onPress: () => void;
  opacity?: number;
  style?: ViewStyle;
  backgroundColor?: string;
  nameColor?: string;
  children?: ReactNode | undefined;
  fontSize?: number;
  borderRadius?: number;
  borderColor?: string;
  fontWeight?:
    | 'bold'
    | '600'
    | 'normal'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '700'
    | '800'
    | '900'
    | undefined;
  paddingHorizontal?: number;
  marginTop?: number;
  marginBottom?: number;
}
const ButtonComponent = (props: ButtonProps) => {
  const {
    name,
    onPress,
    style,
    backgroundColor,
    nameColor,
    padding,
    alignItems,
    alignSelf,
    children,
    marginHorizontal,
    flexDirection,
    justifyContent,
    marginVertical,
    borderWidth,
    fontSize,
    overflow,
    borderRadius,
    borderColor,
    fontWeight,
    paddingVertical,
    paddingHorizontal,
    marginTop,
    flex,
    position,
    marginLeft,
    marginBottom,
    top,
    end,
    bottom,
    opacity,
    left,
  } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        style,
        {
          backgroundColor: backgroundColor,
          borderRadius: borderRadius ?? 20,
          padding: padding ?? 10,
          alignItems: alignItems ?? undefined,
          alignSelf: alignSelf ?? undefined,
          marginHorizontal: marginHorizontal ?? 0,
          flexDirection: flexDirection ?? undefined,
          justifyContent: justifyContent ?? undefined,
          marginVertical: marginVertical ?? 0,
          borderColor: borderColor ?? appColors.white,
          borderWidth: borderWidth ?? 0,
          overflow: overflow,
          paddingHorizontal: paddingHorizontal,
          marginTop: marginTop,
          flex: flex ?? undefined,
          marginLeft: marginLeft ?? undefined,
          marginBottom: marginBottom ?? undefined,
          paddingVertical: paddingVertical,
          position,
          top,
          end,
          bottom,
          left,
          opacity: opacity ?? 1,
        },
      ]}>
      {children ? (
        children
      ) : name ? (
        <TextComponent
          color={nameColor}
          fontSize={fontSize}
          value={name ?? ''}
          fontWeight={fontWeight}
        />
      ) : (
        <></>
      )}
    </TouchableOpacity>
  );
};

export default memo(ButtonComponent);
