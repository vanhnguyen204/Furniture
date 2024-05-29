import React from 'react';
import Box from './Box.tsx';
import ButtonComponent from './ButtonComponent.tsx';
import {ImageRequireSource} from 'react-native';
import TextComponent from './TextComponent.tsx';
import ImageComponent from './ImageComponent.tsx';
interface HeaderProps {
  onLeftPress?: () => void;
  title?: string;
  onRightPress?: () => void;
  iconLeft?: ImageRequireSource;
  iconRight?: ImageRequireSource;
  colorTitle?: string;
  fontSizeTitle?: number;
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
  sizeIconLeft?: number;
  sizeIconRight?: number;
}
const Header = (props: HeaderProps) => {
  const {
    onLeftPress,
    fontWeight,
    fontSizeTitle,
    colorTitle,
    title,
    onRightPress,
    iconLeft,
    iconRight,
    sizeIconLeft,
    sizeIconRight,
  } = props;
  return (
    <Box
      flexDirection={'row'}
      justifyContent={'space-between'}
      alignItems={'center'}>
      <ButtonComponent
        name={'Button left'}
        onPress={() => (onLeftPress ? onLeftPress() : {})}>
        {iconLeft ? (
          <ImageComponent
            src={iconLeft}
            height={sizeIconLeft ? sizeIconLeft : 30}
            width={sizeIconLeft ? sizeIconLeft : 30}
          />
        ) : (
          <TextComponent value={''} />
        )}
      </ButtonComponent>
      <TextComponent
        value={title ?? ''}
        color={colorTitle}
        fontSize={fontSizeTitle}
        fontWeight={fontWeight}
      />
      <ButtonComponent
        name={'Button left'}
        onPress={() => (onRightPress ? onRightPress() : {})}>
        {iconRight ? (
          <ImageComponent
            src={iconRight}
            height={sizeIconRight ? sizeIconRight : 30}
            width={sizeIconRight ? sizeIconRight : 30}
          />
        ) : (
          <TextComponent value={''} fontSize={30} marginLeft={25} />
        )}
      </ButtonComponent>
    </Box>
  );
};

export default Header;
