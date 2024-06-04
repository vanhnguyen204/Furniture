import React, {useCallback, useEffect, useMemo, useState} from 'react';
import Container from '../../components/Container.tsx';
import Header from '../../components/Header.tsx';
import {goBackNavigation, navigatePush} from '../../utils/navigationUtils.ts';
import {appColors} from '../../assets/colors/appColors.ts';
import {getMyCart} from '../../services/api/cart.ts';
import TextComponent from '../../components/TextComponent.tsx';
import {Alert, FlatList} from 'react-native';
import CartItem from './components/CartItem.tsx';
import Box from '../../components/Box.tsx';
import ButtonComponent from '../../components/ButtonComponent.tsx';

const Cart = () => {
  const [listCart, setListCart] = useState([]);
  useEffect(() => {
    getMyCart()
      .then(res => {
        // @ts-ignore
        return setListCart(res);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);
  const calculateTotalPrice = useMemo(() => {
    let sum = 0;
    listCart.map(item => {
      console.log(item);
      // @ts-ignore
      return (sum += item?.price * item?.quantity);
    });
    return sum;
  }, [listCart]);

  const handleIncreaseQuantity = useCallback(
    (index: number) => {
      const filter = listCart.map((item, i) => {
        if (i === index) {
          // @ts-ignore
          item.quantity = ++item.quantity;
        }
        return item;
      });
      setListCart(filter);
    },
    [listCart],
  );

  const handleReduceQuantity = useCallback(
    (index: number) => {
      const filter = listCart.map((item, i) => {
        if (i === index) {
          // @ts-ignore
          if (item.quantity > 1) {
            // @ts-ignore

            item.quantity = --item.quantity;
          } else {
            // @ts-ignore
            item.quantity = 1;
          }
        }
        return item;
      });
      setListCart(filter);
    },
    [listCart],
  );
  const removeFromCart = useCallback((i: number) => {
    setListCart(prevState => {
      return prevState.filter((item, index) => {
        return i !== index;
      });
    });
  }, []);
  const gotoCheckout = () => {
    if (listCart.length !== 0) {
      navigatePush('Checkout', {
        totalPrice: calculateTotalPrice,
        products: listCart,
      });
    } else {
      Alert.alert(
        'Notification',
        'Your cart is empty. Please add some product into your cart.',
      );
    }
  };
  return (
    <Container justifyContent={'space-between'}>
      <Box flex={1}>
        <Header
          iconLeft={require('../../assets/icons/left.png')}
          sizeIconLeft={30}
          onLeftPress={() => {
            goBackNavigation();
          }}
          title={'My cart'}
          fontSizeTitle={16}
          fontWeight={'700'}
          colorTitle={appColors.black900}
        />
        {listCart.length === 0 ? (
          <Box flex={1} alignItems="center" justifyContent="center">
            <TextComponent
              value={'You have not added any products to your cart.'}
              color={appColors.black900}
            />
          </Box>
        ) : (
          <FlatList
            data={listCart}
            renderItem={({item, index}) => (
              <CartItem
                item={item}
                listCart={listCart}
                index={index}
                handleIncreaseQuantity={handleIncreaseQuantity}
                handleReduceQuantity={handleReduceQuantity}
                remove={removeFromCart}
              />
            )}
          />
        )}
      </Box>
      <Box>
        <Box
          marginVertical={10}
          marginHorizontal={10}
          flexDirection={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}>
          <TextComponent
            value={'Total:'}
            fontSize={20}
            fontWeight={'700'}
            color={appColors.grays.gray600}
          />
          <TextComponent
            value={`$ ${calculateTotalPrice}`}
            fontSize={20}
            fontWeight={'700'}
            color={appColors.black900}
          />
        </Box>
        <ButtonComponent
          backgroundColor={appColors.black900}
          borderRadius={15}
          name={'Check out'}
          onPress={gotoCheckout}
          alignItems={'center'}
          justifyContent={'center'}
          padding={20}
          fontSize={20}
          fontWeight={'600'}
          marginHorizontal={10}
        />
      </Box>
    </Container>
  );
};

export default Cart;
