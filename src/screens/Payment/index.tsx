import React, {useEffect, useState} from 'react';
import Container from '../../components/Container.tsx';
import Header from '../../components/Header.tsx';
import {appColors} from '../../assets/colors/appColors.ts';
import {goBackNavigation, navigatePush} from '../../utils/navigationUtils.ts';
import Box from '../../components/Box.tsx';
import ButtonComponent from '../../components/ButtonComponent.tsx';
import ImageComponent from '../../components/ImageComponent.tsx';
import {
  activePayment,
  fetchMyPayment,
  removePayment,
} from '../../services/api/payment.ts';
import TextComponent from '../../components/TextComponent.tsx';
import {Alert, FlatList} from 'react-native';
import Payment from '../../models/Payment.ts';
import BackgroundCard from '../../components/BackgroundCard.tsx';
import {imageUrl} from '../../utils/ip.ts';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../navigators/RootStackParamList.ts';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import CheckBox from '../../components/CheckBox.tsx';
import {activeShippingAddress} from '../../services/api/shippingAddress.ts';
import Address from '../../models/Address.ts';

type CheckoutScreenRouteProp = RouteProp<RootStackParamList, 'Payment'>;
type CheckoutScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Payment'
>;

type Props = {
  route: CheckoutScreenRouteProp;
  navigation: CheckoutScreenNavigationProp;
};
const PaymentScreen = (props: Props) => {
  const {navigation} = props;
  const [myPayment, setMyPayment] = useState<Payment[]>([]);
  const getMyPayment = () => {
    fetchMyPayment()
      .then(res => {
        // @ts-ignore
        setMyPayment(res);
      })
      .catch(e => {
        console.log(e);
      });
  };
  useEffect(() => {
    const unSub = navigation.addListener('focus', () => {
      getMyPayment();
    });
    return () => {
      unSub();
    };
  }, [navigation]);

  const handleUpdateStatus = async (
    value: boolean,
    index: number,
    id: string,
  ) => {
    try {
      await activePayment(id);
      const filter: Payment[] = myPayment.map((payment, i): Payment => {
        if (i === index) {
          payment.isSelected = value;
        } else {
          payment.isSelected = false;
        }
        return payment;
      });
      setMyPayment(filter);
    } catch (e) {
      console.log(e);
    }
  };
  const handleDeletePaymentMethod = (
    id: string,
    index: number,
    isSelected: boolean,
  ) => {
    if (isSelected) {
      Alert.alert(
        'Notification',
        'This payment method is in use,  cannot be deleted at this time.',
      );
      return;
    }
    Alert.alert('Warning', 'Are you sure to remove this payment method?', [
      {
        text: 'Cancel',
      },
      {
        text: 'Remove',
        onPress: () => {
          removePayment(id ?? '')
            .then(res => {
              if (res.status === 200) {
                setMyPayment(prevState => {
                  return prevState.filter((it, i) => {
                    return index !== i;
                  });
                });
              }
            })
            .catch(e => {
              console.log(e);
            });
        },
      },
    ]);
  };
  return (
    <Container justifyContent={'space-between'}>
      <Box flex={1}>
        <Header
          iconLeft={require('../../assets/icons/left.png')}
          title={'Payment method'}
          colorTitle={appColors.black900}
          fontSizeTitle={16}
          onLeftPress={() => goBackNavigation()}
          fontWeight={'600'}
        />
        {myPayment.length === 0 ? (
          <Box flex={1} justifyContent={'center'} alignItems={'center'}>
            <TextComponent
              color={appColors.black900}
              value={"Don't have any payment method in your account."}
            />
          </Box>
        ) : (
          <FlatList
            data={myPayment}
            renderItem={({item, index}) => (
              <Box marginBottom={15}>
                <Box
                  paddingHorizontal={20}
                  marginVertical={10}
                  flexDirection={'row'}
                  alignItems={'center'}>
                  <CheckBox
                    isChecked={item.isSelected}
                    onCheck={() => {
                      handleUpdateStatus(true, index, item._id ?? '');
                    }}
                  />
                  <TextComponent
                    value={'Use as a default payment method'}
                    color={appColors.black900}
                    marginLeft={10}
                  />
                  <Box position={'absolute'} right={10}>
                    <ButtonComponent
                      onPress={() => {
                        handleDeletePaymentMethod(
                          item._id ?? '',
                          index,
                          item.isSelected,
                        );
                      }}>
                      <ImageComponent
                        src={require('../../assets/icons/trash-bin.png')}
                        width={25}
                        height={25}
                      />
                    </ButtonComponent>
                  </Box>
                </Box>
                <BackgroundCard
                  paymentName={item.bankName}
                  image={imageUrl + item.image}
                  cardNumber={item.cartNumber}
                  cvv={item.cvv}
                  expiryDate={item.expiryDate}
                  cardHolderName={item.cartHolderName}
                />
              </Box>
            )}
          />
        )}
      </Box>

      <ButtonComponent
        backgroundColor={appColors.grays.gray300}
        borderRadius={50}
        alignSelf={'flex-end'}
        marginHorizontal={20}
        marginVertical={20}
        padding={15}
        name={'Add shipping address'}
        onPress={() => {
          navigatePush('PaymentHandleScreen');
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

export default PaymentScreen;
