import React from 'react';
import Container from '../../components/Container.tsx';
import TextComponent from '../../components/TextComponent.tsx';
import Header from '../../components/Header.tsx';
import {appColors} from '../../assets/colors/appColors.ts';
import {navigateAndReset, navigatePush} from '../../utils/navigationUtils.ts';
import Box from '../../components/Box.tsx';
import {useUserInformation} from '../../hooks/useUserInformation.ts';
import ImageComponent from '../../components/ImageComponent.tsx';
import ButtonComponent from '../../components/ButtonComponent.tsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ACCESS_TOKEN} from '../../constants/AsyncStorage.ts';
import {Alert} from 'react-native';

const ProfileScreen = () => {
  const {infor, myOrders, myPayments, myAddresses, myReviews} =
    useUserInformation();
  const profileTypes = [
    {
      id: 1,
      name: 'History purchase',
      value: 'View my ordered',
      onPress: () => {
        navigatePush('HistoryPurchase');
      },
    },
    {
      id: 2,
      name: 'Shipping Addresses',
      value: `${myAddresses.length} addresses`,
      onPress: () => {
        navigatePush('ShippingAddress');
      },
    },
    {
      id: 3,
      name: 'Payment Method',
      value: 'Manage your payment',
      onPress: () => {
        navigatePush('Payment');
      },
    },
    {
      id: 4,
      name: 'My Reviews',
      value: `Reviews for ${myReviews.length} items`,
      onPress: () => {},
    },
    {
      id: 5,
      name: 'My products',
      value: 'Manage your products',
      onPress: () => {
        navigatePush('MyProducts');
      },
    },
    {
      id: 6,
      name: 'Setting',
      value: 'Password, FAQ, Contact',
      onPress: () => {},
    },
  ];
  return (
    <Container>
      <Header
        iconRight={require('../../assets/icons/logout.png')}
        title={'Profile'}
        colorTitle={appColors.black900}
        fontSizeTitle={18}
        fontWeight={'700'}
        onRightPress={() => {
          Alert.alert('Notification', 'Are you sure you want to sign out?', [
            {
              text: 'Cancel',
            },
            {
              text: 'Sign out',
              onPress: () => {
                AsyncStorage.setItem(ACCESS_TOKEN, '')
                  .then(() => {
                    navigateAndReset([{name: 'Login'}], 0);
                  })
                  .catch(e => {
                    console.log(e);
                  });
              },
            },
          ]);
        }}
      />
      <Box padding={15}>
        <Box flexDirection={'row'}>
          <ImageComponent src={{uri: infor.avatar}} height={80} width={80} />
          <Box marginLeft={20} justifyContent={'center'}>
            <TextComponent
              value={infor.name}
              color={appColors.black900}
              fontSize={20}
              lineHeight={27}
              fontWeight={'700'}
            />
            <TextComponent
              fontSize={14}
              lineHeight={15}
              fontWeight={'400'}
              value={infor.email}
              color={appColors.grays.gray450}
              marginTop={10}
            />
          </Box>
        </Box>
        {profileTypes.map((item, index) => (
          <ButtonComponent
            padding={10}
            borderRadius={7}
            backgroundColor={appColors.white}
            marginTop={10}
            flexDirection={'row'}
            justifyContent={'space-between'}
            key={index}
            name={item.name}
            onPress={item.onPress}>
            <Box>
              <TextComponent
                value={item.name}
                color={appColors.black900}
                fontSize={18}
                fontWeight={'500'}
                marginBottom={10}
              />
              <TextComponent
                value={item.value}
                color={appColors.grays.gray450}
              />
            </Box>
            <ImageComponent
              src={require('../../assets/icons/arrow-right.png')}
              height={15}
              width={15}
              alignSelf={'center'}
            />
          </ButtonComponent>
        ))}
      </Box>
    </Container>
  );
};

export default ProfileScreen;
