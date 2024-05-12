import React, {memo} from 'react';
import {FlatList, ImageBackground, View} from 'react-native';
import ImageComponent from '../../../components/ImageComponent.tsx';
import Box from '../../../components/Box.tsx';
import TextComponent from '../../../components/TextComponent.tsx';
import {appColors} from '../../../assets/colors/appColors.ts';
import ButtonComponent from '../../../components/ButtonComponent.tsx';
interface ListProductProps {
  data: any;
  column?: number;
}
const ListProduct = (props: ListProductProps) => {
  const {data, column = 1} = props;

  return (
    <Box flex={1}>
      <FlatList
        numColumns={column}
        data={data}
        renderItem={({item, index}) => <ProductItem item={item} />}
      />
    </Box>
  );
};
export const ProductItem = memo(({item}: {item: any}) => (
  <Box overflow={'hidden'} marginHorizontal={10} marginVertical={10} flex={1}>
    <ImageBackground
      source={item?.image}
      style={{
        flex: 1,
        height: 250,
        width: 195,
        borderRadius: 20,
        overflow: 'hidden',
        justifyContent: 'flex-end',
      }}
      resizeMode={'contain'}>
      <ButtonComponent
        alignSelf={'flex-end'}
        borderRadius={10}
        marginVertical={10}
        marginHorizontal={10}
        padding={7}
        backgroundColor={appColors.grays.gray400}
        name={'Shopping bag'}
        onPress={() => {}}>
        <ImageComponent
          tintColor={appColors.white}
          src={require('../../../assets/icons/shopping_bag.png')}
          height={30}
          width={30}
          resizeMode={'cover'}
          alignSelf={'flex-end'}
        />
      </ButtonComponent>
    </ImageBackground>
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
));

export default ListProduct;
