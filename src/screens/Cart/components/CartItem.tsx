import React from 'react';
import Box from '../../../components/Box.tsx';
import ImageComponent from '../../../components/ImageComponent.tsx';
import {imageUrl} from '../../../utils/ip.ts';
import TextComponent from '../../../components/TextComponent.tsx';
import {appColors} from '../../../assets/colors/appColors.ts';
import ButtonComponent from '../../../components/ButtonComponent.tsx';
import {Alert, View} from 'react-native';
import {removeFromCart} from '../../../services/api/cart.ts';
interface ItemProps {
  item: any;
  index: number;
  handleIncreaseQuantity: (index: number) => void;
  handleReduceQuantity: (index: number) => void;
  listCart: any[];
  remove: (index: number) => void;
}
const CartItem = (props: ItemProps) => {
  const {
    item,
    index,
    handleIncreaseQuantity,
    handleReduceQuantity,
    listCart,
    remove,
  } = props;
  return (
    <Box paddingHorizontal={20}>
      <Box flexDirection={'row'}>
        <ImageComponent
          src={{uri: imageUrl + item?.image}}
          width={80}
          height={80}
          resizeMode={'cover'}
          borderRadius={20}
        />
        <Box paddingHorizontal={10} flex={1}>
          <Box flexDirection={'row'} justifyContent={'space-between'}>
            <Box>
              <TextComponent
                value={item?.name}
                color={appColors.grays.gray450}
                fontSize={14}
                fontWeight={'600'}
              />
              <TextComponent
                value={`$ ${item?.price}`}
                color={appColors.black900}
                fontWeight={'700'}
                fontSize={16}
                marginTop={5}
              />
            </Box>
            <ButtonComponent
              padding={0}
              name={'Remove'}
              onPress={() => {
                Alert.alert(
                  'Cảnh báo',
                  'Bạn có chắc muốn xoá sản phẩm này khỏi giỏ hàng không?',
                  [
                    {
                      text: 'Huỷ',
                      onPress: () => {},
                    },
                    {
                      text: 'Xoá',
                      onPress: () => {
                        removeFromCart(item?._id)
                          .then(res => {
                            console.log(res);
                            remove(index);
                          })
                          .catch(e => {
                            console.log(e);
                          });
                      },
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

          <Box flexDirection={'row'} alignItems={'center'}>
            <ButtonComponent
              name={'increase'}
              onPress={() => {
                handleIncreaseQuantity(index);
              }}
              padding={5}
              backgroundColor={appColors.grays.gray400}
              borderRadius={5}>
              <ImageComponent
                src={require('../../../assets/icons/plus_child.png')}
                width={14}
                height={14}
              />
            </ButtonComponent>
            <View
              style={{
                width: 80,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TextComponent
                value={listCart[index]?.quantity}
                color={appColors.black900}
                marginHorizontal={15}
                fontSize={18}
                fontWeight={'600'}
              />
            </View>
            <ButtonComponent
              name={'reduce'}
              onPress={() => {
                handleReduceQuantity(index);
              }}
              padding={5}
              backgroundColor={appColors.grays.gray400}
              borderRadius={5}>
              <ImageComponent
                src={require('../../../assets/icons/minus.png')}
                width={14}
                height={14}
              />
            </ButtonComponent>
          </Box>
        </Box>
      </Box>
      <Box
        flex={1}
        marginVertical={10}
        height={1}
        backgroundColor={appColors.grays.gray400}>
        <View />
      </Box>
    </Box>
  );
};

export default CartItem;
