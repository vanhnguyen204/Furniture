import React from 'react';
import Box from '../../../components/Box.tsx';
import ImageComponent from '../../../components/ImageComponent.tsx';
import Product from '../../../models/Product.ts';
import {imageUrl} from '../../../utils/ip.ts';
import TextComponent from '../../../components/TextComponent.tsx';
import {appColors} from '../../../assets/colors/appColors.ts';
import {View} from 'react-native';
import ButtonComponent from '../../../components/ButtonComponent.tsx';
import {navigatePush} from '../../../utils/navigationUtils.ts';
interface ItemSearchProps {
  item: Product;
  closeModal: () => void;
}
const ItemSearch = (props: ItemSearchProps) => {
  const {item, closeModal} = props;
  return (
    <ButtonComponent
      padding={0}
      onPress={() => {
        closeModal();
        navigatePush('ProductDetailsScreen', {item: item});
      }}
      marginHorizontal={10}
      marginVertical={10}>
      <Box flexDirection={'row'}>
        <ImageComponent
          src={{uri: imageUrl + item.image}}
          height={80}
          width={80}
          resizeMode={'cover'}
          borderRadius={20}
        />
        <TextComponent
          value={item.name}
          color={appColors.black900}
          marginLeft={10}
        />
      </Box>
      <Box
        marginVertical={10}
        flex={1}
        height={1}
        backgroundColor={appColors.grays.gray400}>
        <View />
      </Box>
    </ButtonComponent>
  );
};

export default ItemSearch;
