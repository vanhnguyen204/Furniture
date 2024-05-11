import { View, Text, FlexStyle } from "react-native";
import React, {memo} from 'react';
import {globalStyle} from '../styles/globalStyle';
import {appColors} from '../assets/colors/appColors';

interface TextProps extends FlexStyle {
  value: string;
  color?: string;
  fontSize?: number;
  fontFamily?: string;
  margin?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  fontWeight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
    | undefined;
  lineHeight?: number;
}
const TextComponent = (props: TextProps) => {
  const {
    value,
    color,
    fontFamily,
    fontSize,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    alignSelf,
    marginVertical,
    marginHorizontal,
    margin,
    fontWeight,
    lineHeight
  } = props;
  return (
    <Text
      style={[
        globalStyle.textStyle,
        {
          color: color ?? appColors.white,
          fontFamily: fontFamily,
          fontSize: fontSize ?? 14,
          marginTop: marginTop ?? null,
          marginBottom: marginBottom ?? null,
          marginLeft: marginLeft ?? null,
          marginRight: marginRight ?? null,
          alignSelf: alignSelf ?? undefined,
          marginVertical: marginVertical ?? 0,
          marginHorizontal: marginHorizontal ?? 0,
          margin: margin ?? 0,
          fontWeight: fontWeight,
          lineHeight: lineHeight ?? undefined,
        },
      ]}>
      {value}
    </Text>
  );
};

export default memo(TextComponent);
