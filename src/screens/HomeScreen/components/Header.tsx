import React from 'react';
import Box from '../../../components/Box.tsx';
import ImageComponent from '../../../components/ImageComponent.tsx';
import TextComponent from '../../../components/TextComponent.tsx';
import {appColors} from '../../../assets/colors/appColors.ts';
import ButtonComponent from '../../../components/ButtonComponent.tsx';
interface HeaderProps {
  onSearch: () => void;
  onCart: () => void;
}
const Header = (props: HeaderProps) => {
  const {onSearch, onCart} = props;
  return (
    <Box flexDirection={'row'} justifyContent={'space-between'}>
      <ButtonComponent name={'Search'} onPress={onSearch}>
        <ImageComponent
          src={require('../../../assets/icons/search_2.png')}
          height={30}
          width={30}
        />
      </ButtonComponent>
      <Box>
        <TextComponent
          fontSize={16}
          lineHeight={25}
          fontWeight={'400'}
          color={appColors.grays.gray450}
          value={'MAKE HOME'}
        />
        <TextComponent
          fontSize={18}
          lineHeight={25}
          fontWeight={'700'}
          color={appColors.black900}
          value={'BEAUTIFUL'}
        />
      </Box>
      <ButtonComponent name={'Cart'} onPress={onCart}>
        <ImageComponent
          src={require('../../../assets/icons/bi_cart2.png')}
          height={30}
          width={30}
          tintColor={appColors.black900}
        />
      </ButtonComponent>
    </Box>
  );
};

export default Header;
