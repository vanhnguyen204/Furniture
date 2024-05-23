import {
  ImageSourcePropType,
  Image,
  ImageResizeMode,
  FlexAlignType,
  ViewStyle,
  FlexStyle, ImageStyle
} from "react-native";
import React, {memo} from 'react';
interface ImageProps {
  src: ImageSourcePropType;
  width?: number;
  height?: number | undefined;
  tintColor?: string | undefined;
  resizeMode?: ImageResizeMode;
  alignSelf?: FlexAlignType;
  margin?: number;
  marginVertical?: number;
  marginHorizontal?: number;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  marginBottom?: number;
  flex?: number;
  style?: ImageStyle;
  borderRadius?: number;
}
const ImageComponent = (props: ImageProps) => {
  const {
    src,
    height,
    width,
    tintColor = undefined,
    resizeMode = 'contain',
    alignSelf = 'flex-start',
    margin = 0,
    marginBottom = 0,
    marginHorizontal = 0,
    marginLeft = 0,
    marginRight = 0,
    marginTop = 0,
    marginVertical = 0,
    flex,
    borderRadius,
    style,
  } = props;
  return (
    <Image
      source={src}
      style={[
        style,
        {
          height: height ?? undefined,
          width: width ?? undefined,
          tintColor: tintColor,
          resizeMode: resizeMode,
          alignSelf: alignSelf,
          margin: margin,
          marginBottom: marginBottom,
          marginHorizontal: marginHorizontal,
          marginLeft: marginLeft,
          marginRight: marginRight,
          marginTop: marginTop,
          marginVertical: marginVertical,
          flex: flex ?? 0,
          borderRadius: borderRadius ?? 0,
        },
      ]}
    />
  );
};

export default memo(ImageComponent);
