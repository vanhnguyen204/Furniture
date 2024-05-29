import {View, Text, FlexStyle, TextStyle} from 'react-native';
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
  maxLine?: number;
  style?: TextStyle;
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
    lineHeight,
    maxLine,
    style,
  } = props;
  return (
    <Text
      numberOfLines={maxLine}
      style={[
        globalStyle.textStyle,
        style,
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
