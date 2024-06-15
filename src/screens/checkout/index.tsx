import React, {useEffect, useMemo, useState} from 'react';
import Container from '../../components/Container.tsx';
import Header from '../../components/Header.tsx';
import {appColors} from '../../assets/colors/appColors.ts';
import {getMyAddressIsSelected} from '../../services/api/shippingAddress.ts';
import {goBackNavigation, navigatePush} from '../../utils/navigationUtils.ts';
import Box from '../../components/Box.tsx';
import {Alert, View} from 'react-native';
import TextComponent from '../../components/TextComponent.tsx';
import ImageComponent from '../../components/ImageComponent.tsx';
import ButtonComponent from '../../components/ButtonComponent.tsx';
import {AppInfor} from '../../constants/AppInfor.ts';
import {RootStackParamList} from '../../navigators/RootStackParamList.ts';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {getMySelectedPayment} from '../../services/api/payment.ts';
import {imageUrl} from '../../utils/ip.ts';
import CheckBox from '../../components/CheckBox.tsx';
import {createInvoice} from '../../services';
import {RequestInvoice} from '../../services/api/invoice.ts';
import {useUserInformation} from '../../hooks/useUserInformation.ts';
import Address from '../../models/Address.ts';

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
  const {totalPrice, products} = props.route.params;
  const {myAddresses} = useUserInformation();
  const [isFastDelivery, setIsFastDelivery] = useState(true);
  const [currenShippingAddress, setCurrenShippingAddress] = useState<Address>({
    recipient: '',
    addressDetail: '',
    district: '',
    city: '',
    country: '',
    isSelected: false,
    _id: '',
  });
  const [currentPayment, setCurrentPayment] = useState({
    image: '',
    cardNumber: '',
    type: '',
  });

  const somePrice = [
    {
      name: 'Order:',
      price: totalPrice,
    },
    {
      name: 'Delivery:',
      price: isFastDelivery ? 5 : 2,
    },
    {
      name: 'Total:',
      price: totalPrice + (isFastDelivery ? 5 : 2),
    },
  ];
  const handleRenderCardNumber = useMemo(
    () => (cardNumber: string) => {
      let sub = cardNumber.substring(cardNumber.length - 4);
      let star = '';
      for (let i = 0; i < cardNumber.length - 4; i++) {
        star += '*';
      }
      return star + sub;
    },
    [],
  );
  const handleConfirmCheckout = () => {
    const filter: RequestInvoice[] = products.map(item => {
      return {
        productId: item._id ?? '',
        price: item.price,
        quantity: item.quantity,
      };
    });
    const shippingAddress =
      currenShippingAddress.addressDetail +
      ', ' +
      currenShippingAddress.district +
      ', ' +
      currenShippingAddress.city +
      ', ' +
      currenShippingAddress.country;
    const delivery = isFastDelivery ? 'fast' : 'normal';
    Alert.alert('Notification', 'Are you sure you want to submit your order?', [
      {
        text: 'Cancel',
      },
      {
        text: 'Submit',
        onPress: () => {
          createInvoice(
            filter,
            totalPrice,
            currentPayment.type,
            shippingAddress,
            delivery,
          )
            .then(res => {
              if (res.status === 201) {
                navigatePush('DonePurchase');
              }
            })
            .catch(e => {
              console.log(e);
            });
        },
      },
    ]);
  };
  useEffect(() => {
    const unsub = props.navigation.addListener('focus', () => {
      getMyAddressIsSelected()
        .then(res => {
          setCurrenShippingAddress(res.data);
        })
        .catch(e => {
          console.log(e);
        });
      const filterAddress: Address[] = myAddresses.filter(item => {
        return item.isSelected;
      });

      setCurrenShippingAddress(filterAddress[0]);
      getMySelectedPayment()
        .then(res => {
          console.log(res);
          setCurrentPayment({
            // @ts-ignore
            image: res.image,
            // @ts-ignore
            cardNumber: res.cartNumber,
            // @ts-ignore
            type: res.type,
          });
        })
        .catch(e => {
          console.log(e);
        });
    });

    return () => {
      unsub();
    };
  }, [myAddresses, props.navigation]);
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
              onPress={() => {
                navigatePush('ShippingAddress');
              }}>
              <ImageComponent
                src={require('../../assets/icons/pen_icon.png')}
                width={25}
                height={25}
              />
            </ButtonComponent>
          </Box>

          <Box radius={5} marginBottom={30} backgroundColor={appColors.white}>
            <TextComponent
              value={currenShippingAddress?.recipient}
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
                currenShippingAddress?.addressDetail +
                ', ' +
                currenShippingAddress?.district +
                ', ' +
                currenShippingAddress?.city +
                ', ' +
                currenShippingAddress?.country
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
            <ButtonComponent
              name={'Pen edit payment'}
              onPress={() => {
                navigatePush('Payment');
              }}>
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
              src={{uri: imageUrl + currentPayment.image}}
              width={30}
              height={30}
            />
            <TextComponent
              value={handleRenderCardNumber(currentPayment.cardNumber)}
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
            <CheckBox
              isChecked={isFastDelivery}
              onCheck={() => {
                setIsFastDelivery(prevState => !prevState);
              }}
            />
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
              value={isFastDelivery ? 'Fast (2-3 days)' : 'Standard (4-5 days)'}
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
        onPress={() => {
          handleConfirmCheckout();
        }}
        backgroundColor={appColors.black900}
        padding={15}
        alignItems={'center'}
        marginHorizontal={20}
        borderRadius={10}
      />
    </Container>
  );
};
// @ts-ignore
export default CheckoutScreen;
