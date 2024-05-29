import React, {useEffect, useState} from 'react';
import Container from '../../components/Container.tsx';
import Header from '../../components/Header.tsx';
import {appColors} from '../../assets/colors/appColors.ts';
import {getMyAddressIsSelected} from '../../services/api/shippingAddress.ts';
import {goBackNavigation} from '../../utils/navigationUtils.ts';
import Box from '../../components/Box.tsx';
import {View} from 'react-native';
import TextComponent from '../../components/TextComponent.tsx';
import ImageComponent from '../../components/ImageComponent.tsx';
import ButtonComponent from '../../components/ButtonComponent.tsx';
import {AppInfor} from '../../constants/AppInfor.ts';
import {RootStackParamList} from '../../navigators/RootStackParamList.ts';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type CheckoutScreenRouteProp = RouteProp<RootStackParamList, 'Checkout'>;
type CheckoutScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Checkout'
>;

type Props = {
  route: CheckoutScreenRouteProp;
  navigation: CheckoutScreenNavigationProp;
};
const CheckoutScreen = (props: Props) => {
  const {totalPrice} = props.route.params;
  const [currenShippingAddress, setCurrenShippingAddress] = useState({
    recipient: '',
    addressDetail: '',
    district: '',
    city: '',
    country: '',
  });
  useEffect(() => {
    getMyAddressIsSelected()
      .then(res => {
        setCurrenShippingAddress(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);
  const somePrice = [
    {
      name: 'Order:',
      price: totalPrice,
    },
    {
      name: 'Delivery:',
      price: 5,
    },
    {
      name: 'Total:',
      price: totalPrice + 5,
    },
  ];
  return (
    <Container justifyContent={'space-between'}>
      <Box>
        <Header
          iconLeft={require('../../assets/icons/left.png')}
          title={'Checkout'}
          sizeIconLeft={30}
          fontSizeTitle={16}
          colorTitle={appColors.black900}
          onLeftPress={() => goBackNavigation()}
          fontWeight={'700'}
        />
        <Box paddingHorizontal={20}>
          <Box
            flexDirection={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}>
            <TextComponent
              value={'Shipping Address'}
              fontSize={18}
              color={appColors.grays.gray450}
              fontWeight={'600'}
            />
            <ButtonComponent
              name={'Pen edit shipping address'}
              onPress={() => {}}>
              <ImageComponent
                src={require('../../assets/icons/pen_icon.png')}
                width={25}
                height={25}
              />
            </ButtonComponent>
          </Box>

          <Box radius={5} marginBottom={30} backgroundColor={appColors.white}>
            <TextComponent
              value={currenShippingAddress.recipient}
              color={appColors.black900}
              fontSize={18}
              fontWeight={'700'}
              marginHorizontal={20}
              marginTop={15}
            />
            <Box
              marginVertical={10}
              width={AppInfor.width}
              height={2}
              backgroundColor={'#f2f2f2'}>
              <View />
            </Box>
            <TextComponent
              maxLine={2}
              marginHorizontal={20}
              marginBottom={15}
              color={appColors.grays.gray450}
              value={
                currenShippingAddress.addressDetail +
                ', ' +
                currenShippingAddress.district +
                ', ' +
                currenShippingAddress.city +
                ', ' +
                currenShippingAddress.country
              }
            />
          </Box>
          <Box
            flexDirection={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}>
            <TextComponent
              value={'Payment'}
              fontSize={18}
              color={appColors.grays.gray450}
              fontWeight={'600'}
            />
            <ButtonComponent name={'Pen edit payment'} onPress={() => {}}>
              <ImageComponent
                src={require('../../assets/icons/pen_icon.png')}
                width={25}
                height={25}
              />
            </ButtonComponent>
          </Box>
          <Box
            radius={5}
            marginBottom={30}
            padding={20}
            flexDirection={'row'}
            alignItems={'center'}
            backgroundColor={appColors.white}>
            <ImageComponent
              src={require('../../assets/icons/mastercard.png')}
              width={30}
              height={30}
            />
            <TextComponent
              value={'**** **** **** 2004'}
              color={appColors.black900}
              fontSize={14}
              fontWeight={'400'}
              marginHorizontal={20}
            />
          </Box>

          <Box
            flexDirection={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}>
            <TextComponent
              value={'Delivery'}
              fontSize={18}
              color={appColors.grays.gray450}
              fontWeight={'600'}
            />
            <ButtonComponent name={'Pen edit Payment'} onPress={() => {}}>
              <ImageComponent
                src={require('../../assets/icons/pen_icon.png')}
                width={25}
                height={25}
              />
            </ButtonComponent>
          </Box>
          <Box
            radius={5}
            marginBottom={30}
            paddingHorizontal={20}
            flexDirection={'row'}
            alignItems={'center'}
            backgroundColor={appColors.white}>
            <ImageComponent
              src={require('../../assets/icons/delivery.png')}
              width={50}
              height={50}
            />
            <TextComponent
              value={'Fast (2-3days)'}
              color={appColors.black900}
              fontSize={14}
              fontWeight={'400'}
              marginHorizontal={20}
            />
          </Box>
        </Box>
        <Box
          marginHorizontal={20}
          backgroundColor={appColors.white}
          padding={20}
          radius={10}>
          {somePrice.map((item, index) => (
            <Box
              marginBottom={10}
              key={index}
              flexDirection={'row'}
              justifyContent={'space-between'}>
              <TextComponent
                value={item.name}
                fontWeight={'400'}
                fontSize={18}
                color={appColors.grays.gray450}
              />
              <TextComponent
                value={`$ ${item.price}.0`}
                fontWeight={'400'}
                fontSize={18}
                color={appColors.black900}
              />
            </Box>
          ))}
        </Box>
      </Box>
      <ButtonComponent
        name={'SUBMIT ORDER'}
        onPress={() => {}}
        backgroundColor={appColors.black900}
        padding={15}
        alignItems={'center'}
        marginHorizontal={20}
      />
    </Container>
  );
};

export default CheckoutScreen;
