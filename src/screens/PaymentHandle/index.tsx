import React, {useState} from 'react';
import Container from '../../components/Container.tsx';
import Header from '../../components/Header.tsx';
import {appColors} from '../../assets/colors/appColors.ts';
import {goBackNavigation} from '../../utils/navigationUtils.ts';
import Box from '../../components/Box.tsx';
import ButtonComponent from '../../components/ButtonComponent.tsx';
import BackgroundCard from '../../components/BackgroundCard.tsx';
import TextComponent from '../../components/TextComponent.tsx';
import InputComponent from '../../components/InputComponent.tsx';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import {globalStyle} from '../../styles/globalStyle.ts';
import ModalBottomBank, {BankType} from '../../components/ModalBottomBank.tsx';
import ImageComponent from '../../components/ImageComponent.tsx';
import {createPayment} from '../../services/api/payment.ts';
import Payment from '../../models/Payment.ts';

const PaymentHandleScreen = () => {
  const [cardNumber, setCartNumber] = useState<string>('');
  const [cardHolderName, setCardHolderName] = useState<string>('');
  const [expiryDate, setExpiryDate] = useState<string>('');
  const [cvv, setCvv] = useState<string>('');
  const data: BankType[] = [
    {
      image: require('../../assets/icons/icon_vietcombank.png'),
      type: 'vietcombank',
      name: 'Vietcombank',
    },
    {
      image: require('../../assets/icons/icon_acbbank.jpg'),
      type: 'acbbank',
      name: 'ACB Bank',
    },
    {
      image: require('../../assets/icons/icon_agribank.jpg'),
      type: 'agribank',
      name: 'Agribank',
    },
    {
      image: require('../../assets/icons/icon_mbbank.jpg'),
      type: 'mbbank',
      name: 'MB Bank',
    },
    {
      image: require('../../assets/icons/icon_tpbank.jpg'),
      type: 'tpbank',
      name: 'TP Bank',
    },
    {
      image: require('../../assets/icons/icon_vibbank.jpg'),
      type: 'vibbank',
      name: 'VIB Bank',
    },
    {
      image: require('../../assets/icons/icon_vpbank.jpg'),
      type: 'vpbank',
      name: 'VP Bank',
    },
  ];
  const [isLoading, setIsLoading] = useState(false);
  const [bankDefault, setBankDefault] = useState<BankType>({
    type: 'vietcombank',
    image: require('../../assets/icons/icon_vietcombank.png'),
    name: 'Vietcombank',
  });
  const [modalBottomBankVisible, setModalBottomBankVisible] = useState(false);
  const toggleModalBank = () => {
    setModalBottomBankVisible(prevState => !prevState);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[globalStyle.containerStyle]}
      keyboardVerticalOffset={Platform.select({ios: 0, android: 500})}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container justifyContent={'space-between'}>
          <ModalBottomBank
            data={data}
            isShow={modalBottomBankVisible}
            onClose={toggleModalBank}
            onItemPress={bank => {
              setBankDefault(bank);
            }}
          />
          <Box>
            <Header
              iconLeft={require('../../assets/icons/left.png')}
              title={'Add new payment'}
              colorTitle={appColors.black900}
              fontSizeTitle={16}
              onLeftPress={() => goBackNavigation()}
              fontWeight={'600'}
            />
            <BackgroundCard
              cardHolderName={cardHolderName}
              cardNumber={cardNumber}
              paymentName={bankDefault.name}
              image={bankDefault.image}
              cvv={0}
              expiryDate={expiryDate}
            />
            <ButtonComponent
              backgroundColor={appColors.grays.gray300}
              name={'Select bank'}
              marginHorizontal={20}
              marginTop={20}
              alignItems={'center'}
              borderRadius={10}
              onPress={toggleModalBank}
              flexDirection={'row'}>
              <ImageComponent
                borderRadius={10}
                src={bankDefault.image}
                height={40}
                width={40}
              />
              <TextComponent
                value={bankDefault.name}
                marginLeft={10}
                color={appColors.black900}
                fontSize={16}
              />
            </ButtonComponent>

            <Box
              marginTop={20}
              radius={10}
              padding={20}
              backgroundColor={appColors.grays.gray300}
              marginHorizontal={20}>
              <TextComponent
                fontSize={12}
                value={'Card Holder Name'}
                color={appColors.grays.gray450}
                marginBottom={5}
              />
              <InputComponent
                textColor={appColors.black900}
                placeholder={'Ex: NGUYEN VAN A'}
                value={cardHolderName}
                onChangeText={setCardHolderName}
                placeholderTextColor={appColors.grays.gray450}
              />
            </Box>

            <Box
              marginTop={20}
              radius={10}
              padding={20}
              backgroundColor={appColors.grays.gray300}
              marginHorizontal={20}>
              <TextComponent
                fontSize={12}
                value={'Card Number'}
                color={appColors.grays.gray450}
                marginBottom={5}
              />
              <InputComponent
                keyboardType={'numeric'}
                placeholder={'Ex: 101 *** 4509'}
                textColor={appColors.black900}
                value={cardNumber}
                onChangeText={setCartNumber}
                placeholderTextColor={appColors.grays.gray450}
              />
            </Box>

            <Box
              flexDirection={'row'}
              justifyContent={'space-between'}
              marginHorizontal={20}>
              <Box
                marginTop={20}
                radius={10}
                padding={20}
                backgroundColor={appColors.grays.gray300}>
                <TextComponent
                  fontSize={12}
                  value={'CVV'}
                  color={appColors.grays.gray450}
                  marginBottom={5}
                />
                <InputComponent
                  placeholder={'Ex: 123'}
                  textColor={appColors.black900}
                  value={cvv}
                  onChangeText={setCvv}
                  placeholderTextColor={appColors.grays.gray450}
                />
              </Box>
              <Box
                flex={1}
                marginLeft={20}
                marginTop={20}
                radius={10}
                padding={20}
                backgroundColor={appColors.grays.gray300}>
                <TextComponent
                  fontSize={12}
                  value={'Expiry Date'}
                  color={appColors.grays.gray450}
                  marginBottom={5}
                />
                <InputComponent
                  placeholder={'Ex: 08/24'}
                  textColor={appColors.black900}
                  value={expiryDate}
                  onChangeText={setExpiryDate}
                  placeholderTextColor={appColors.grays.gray450}
                />
              </Box>
            </Box>
          </Box>
          <ButtonComponent
            backgroundColor={appColors.black900}
            marginHorizontal={20}
            padding={18}
            alignItems={'center'}
            fontWeight={'600'}
            name={'ADD NEW CARD '}
            nameColor={appColors.white}
            onPress={() => {
              const payment: Payment = {
                cartNumber: cardNumber,
                bankName: bankDefault.name,
                expiryDate: expiryDate,
                cvv: Number(cvv),
                cartHolderName: cardHolderName,
                type: bankDefault.type,
                isSelected: false,
                image: '',
              };
              setIsLoading(true);
              createPayment(payment)
                .then(res => {
                  if (res.status === 201) {
                    Alert.alert(
                      'Notification',
                      'Create payment method successfully!',
                      [
                        {
                          text: 'Ok',
                          onPress: () => {
                            goBackNavigation();
                          },
                        },
                      ],
                    );
                  }

                  setIsLoading(false);
                })
                .catch(e => {
                  setIsLoading(false);
                  console.log(e);
                  Alert.alert(
                    'Notification',
                    'This payment method is already in use',
                    [
                      {
                        text: 'Ok',
                        onPress: () => {},
                      },
                    ],
                  );
                });
            }}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default PaymentHandleScreen;
