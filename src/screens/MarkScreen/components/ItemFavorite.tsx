import React, {useEffect} from 'react';
import Box from '../../../components/Box.tsx';
import TextComponent from '../../../components/TextComponent.tsx';
import {appColors} from '../../../assets/colors/appColors.ts';
import ImageComponent from '../../../components/ImageComponent.tsx';
import {imageUrl} from '../../../utils/ip.ts';
import ButtonComponent from '../../../components/ButtonComponent.tsx';
import {Alert} from 'react-native';
import {
  addProductToCart,
  checkVarProductInCart,
} from '../../../services/api/cart.ts';
import {navigatePush} from '../../../utils/navigationUtils.ts';
interface ItemFavoriteProps {
  item: any;
  index: number;
  handleDeleteFavorite: (productId: string) => void;
}
const ItemFavorite = (props: ItemFavoriteProps) => {
  const {item, index, handleDeleteFavorite} = props;
  useEffect(() => {
    checkVarProductInCart(item._id)
      .then(res => {
        console.log(res);
      })
      .catch(e => {
        console.log(e);
      });
  }, [item._id]);
  const onBagPress = () => {
    addProductToCart(item._id, 1)
      .then(res => {
        if (res.status === 201) {
          Alert.alert('Thông báo', 'Đã thêm sản phẩm vào giỏ hàng.');
          navigatePush('Cart');
          return;
        }
        if (res.status === 200) {
          Alert.alert(
            'Thông báo',
            'Đã tăng số lượng của sản phẩm trong giỏ hàng.',
          );
          navigatePush('Cart');
          return;
        }
      })
      .catch(e => {
        console.log(e);
      });
  };
  return (
    <Box padding={10}>
      <Box flex={1} flexDirection={'row'}>
        <ImageComponent
          src={{uri: imageUrl + item.image}}
          height={100}
          width={100}
          resizeMode={'cover'}
          borderRadius={20}
        />
        <Box flex={1}>
          <Box
            flexDirection={'row'}
            flex={1}
            justifyContent={'space-between'}
            marginHorizontal={10}>
            <Box>
              <TextComponent value={item.name} color={appColors.black900} />
              <TextComponent
                value={`$ ${item.price}`}
                color={appColors.black900}
              />
            </Box>
            <ButtonComponent
              padding={0}
              name={`Delete favorite ${index}`}
              onPress={() => {
                Alert.alert(
                  'Warning',
                  'Are you sure to discard this product?',
                  [
                    {
                      text: 'Cancel',
                    },
                    {
                      text: 'Remove',
                      onPress: () => handleDeleteFavorite(item._id),
                    },
                  ],
                );
              }}>
              <ImageComponent
                src={require('../../../assets/icons/close_2.png')}
                width={20}
                height={20}
              />
            </ButtonComponent>
          </Box>
          <Box
            flexDirection={'row'}
            justifyContent={'flex-end'}
            paddingHorizontal={10}>
            <ButtonComponent
              onPress={onBagPress}
              padding={5}
              borderRadius={10}
              backgroundColor={appColors.grays.gray300}>
              <ImageComponent
                tintColor={appColors.black900}
                src={require('../../../assets/icons/shopping_bag.png')}
                width={20}
                height={20}
              />
            </ButtonComponent>
          </Box>
        </Box>
      </Box>
      <Box
        flex={1}
        height={1}
        marginTop={15}
        backgroundColor={appColors.grays.gray300}
      />
    </Box>
  );
};

export default ItemFavorite;
