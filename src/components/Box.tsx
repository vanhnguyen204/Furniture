import {FlexStyle, View, ViewStyle} from 'react-native';
import React, {memo, ReactNode} from 'react';
import {appColors} from '../assets/colors/appColors';
interface BoxProps extends FlexStyle {
  children?: ReactNode;
  backgroundColor?: string;
  opacity?: number;
  style?: ViewStyle | ViewStyle[];
  radius?: number;
  borderColor?: string;
  width?: number;
  height?: number;
}
const Box = (props: BoxProps) => {
  const {
    children,
    flex,
    alignItems,
    backgroundColor,
    opacity,
    style,
    margin,
    marginBottom,
    marginTop,
    marginLeft,
    marginRight,
    padding,
    paddingBottom,
    paddingTop,
    paddingLeft,
    paddingRight,
    paddingHorizontal,
    paddingVertical,
    radius,
    flexDirection,
    borderWidth,
    borderColor,
    marginVertical,
    marginHorizontal,
    alignSelf,
    justifyContent,
    position = undefined,
    top = null,
    right = null,
    bottom = null,
    left = null,
    zIndex,
    overflow,
    width,
    height,
  } = props;
  return (
    <View
      style={[
        style,
        {
          flex: flex ?? 0,
          flexDirection: flexDirection ?? undefined,
          alignItems: alignItems ?? undefined,
          backgroundColor: backgroundColor ?? undefined,
          opacity: opacity ?? 1,
          margin: margin ?? 0,
          marginBottom: marginBottom ?? null,
          marginTop: marginTop ?? null,
          marginLeft: marginLeft ?? null,
          marginRight: marginRight ?? null,
          padding: padding ?? null,
          paddingBottom: paddingBottom ?? null,
          paddingTop: paddingTop ?? null,
          paddingLeft: paddingLeft ?? null,
          paddingRight: paddingRight ?? null,
          paddingHorizontal: paddingHorizontal ?? null,
          paddingVertical: paddingVertical ?? null,
          borderRadius: radius ?? 0,
          borderWidth: borderWidth ?? 0,
          marginHorizontal: marginHorizontal ?? 0,
          marginVertical: marginVertical ?? 0,
          alignSelf: alignSelf ?? undefined,
          justifyContent: justifyContent ?? undefined,
          position: position,
          top,
          right,
          left,
          bottom,
          zIndex: zIndex ?? 0,
          overflow: overflow ?? undefined,
          borderColor: borderColor ?? appColors.white,
          width: width ?? undefined,
          height: height ?? undefined,
        },
      ]}>
      {children}
    </View>
  );
};

export default memo(Box);
