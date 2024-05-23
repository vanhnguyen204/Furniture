import React, {memo, ReactElement, ReactNode} from 'react';
import {FlatList, ImageBackground, RefreshControl, View} from 'react-native';
import ImageComponent from '../../../components/ImageComponent.tsx';
import Box from '../../../components/Box.tsx';
import TextComponent from '../../../components/TextComponent.tsx';
import {appColors} from '../../../assets/colors/appColors.ts';
import ButtonComponent from '../../../components/ButtonComponent.tsx';
import {navigatePush} from '../../../utils/navigationUtils.ts';
import {PageName} from '../../../config/pageName.ts';
import {imageUrl} from '../../../utils/ip.ts';
import {log} from 'react-native-reanimated-carousel/lib/typescript/utils/log';
interface ListProductProps {
  data: any;
  column?: number;
  onRefresh: () => void;
  refresh: boolean;
}
const ListProduct = (props: ListProductProps) => {
  const {data, column = 1, onRefresh, refresh} = props;
  return (
    <FlatList
      refreshing={refresh}
      onRefresh={() => {
        onRefresh();
      }}
      numColumns={column}
      data={data}
      renderItem={({item}) => <ProductItem item={item} />}
    />
  );
};
export const ProductItem = memo(({item}: {item: any}) => (
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
      resizeMode={'cover'}>
      <ButtonComponent
        alignSelf={'flex-end'}
        borderRadius={10}
        marginVertical={10}
        marginHorizontal={10}
        padding={7}
        backgroundColor={appColors.grays.gray400}
        name={'Shopping bag'}
        onPress={() => {
          navigatePush(PageName.ProductDetailsScreen, {item});
        }}>
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
