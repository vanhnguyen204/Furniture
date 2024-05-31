import React from 'react';
import Box from '../../../components/Box.tsx';
import Product from '../../../models/Product.ts';
import {ImageBackground, Pressable} from 'react-native';
import {imageUrl} from '../../../utils/ip.ts';
import {appColors} from '../../../assets/colors/appColors.ts';
import TextComponent from '../../../components/TextComponent.tsx';
import ButtonComponent from '../../../components/ButtonComponent.tsx';
import {navigatePush} from '../../../utils/navigationUtils.ts';

interface MyProductItemProps {
  item: Product;
}
const MyProductItem = (props: MyProductItemProps) => {
  const {item} = props;
  return (
    <Pressable
      style={{flex: 1}}
      onPress={() => {
        navigatePush('ManageMyProducts', {isCreate: false, item: item});
      }}>
      <Box
        overflow={'hidden'}
        marginVertical={10}
        flex={1}
        marginHorizontal={5}
        alignItems={'center'}>
        <ImageBackground
          source={{uri: imageUrl + item?.image}}
          style={{
            flex: 1,
            height: 230,
            width: 180,
            borderRadius: 20,
            overflow: 'hidden',
            justifyContent: 'flex-end',
          }}
          resizeMode={'cover'}
        />
        <TextComponent
          value={item.name}
          color={appColors.grays.gray600}
          fontWeight={'400'}
          lineHeight={19}
          fontSize={14}
          marginVertical={5}
        />
        <TextComponent
          value={`$ ${item.price}.00`}
          color={appColors.black900}
          fontWeight={'700'}
          lineHeight={19}
          fontSize={14}
        />
      </Box>
    </Pressable>
  );
};

export default MyProductItem;
