import React from 'react';
import Container from '../../components/Container.tsx';
import Box from '../../components/Box.tsx';
import Header from '../../components/Header.tsx';
import ButtonComponent from '../../components/ButtonComponent.tsx';
import ImageComponent from '../../components/ImageComponent.tsx';
import {goBackNavigation, navigatePush} from '../../utils/navigationUtils.ts';
import {appColors} from '../../assets/colors/appColors.ts';

const MyProducts = () => {
  return (
    <Container>
      <Box flex={1}>
        <Header
          iconLeft={require('../../assets/icons/left.png')}
          onLeftPress={() => goBackNavigation()}
          title={'My Products'}
          colorTitle={appColors.black900}
          fontSizeTitle={16}
          fontWeight={'600'}
        />
      </Box>
      <ButtonComponent
        backgroundColor={appColors.grays.gray400}
        alignSelf={'flex-end'}
        marginHorizontal={20}
        marginBottom={20}
        name={'Add product'}
        onPress={() => {
          navigatePush('ManageMyProducts', {isCreate: true});
        }}>
        <ImageComponent
          src={require('../../assets/icons/plus_child.png')}
          height={20}
          width={20}
        />
      </ButtonComponent>
    </Container>
  );
};

export default MyProducts;
