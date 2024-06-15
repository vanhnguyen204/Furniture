import React, {useState} from 'react';
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
import {launchImageLibrary} from 'react-native-image-picker';
import {uploadAvatar} from '../../services/api/auth.ts';
import {imageUrl} from '../../utils/ip.ts';

const ProfileScreen = () => {
  const {infor, setInfor} = useUserInformation();
  const profileTypes = [
    {
      id: 2,
      name: 'Shipping Addresses',
      value: 'See addresses details',
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
      value: 'Go to reviews',
      onPress: () => {
        navigatePush('MyReviews');
      },
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
      value: 'Password, Information',
      onPress: () => {
        navigatePush('Setting');
      },
    },
  ];
  const handleSelectAvatar = async () => {
    try {
      const formData = new FormData();
      launchImageLibrary({
        mediaType: 'photo',
        includeBase64: false,
        includeExtra: true,
      })
        .then(res => {
          // @ts-ignore
          const img = res?.assets[0];
          formData.append('file', {
            type: img.type,
            uri: img.uri,
            name: img.fileName,
          });
          uploadAvatar(formData)
            .then(response => {
              console.log('Upload avatar');
              console.log(response);
              if (response.newAvatar) {
                setInfor({
                  ...infor,
                  avatar: response.newAvatar,
                });
              }
            })
            .catch(e => {
              console.log(e);
            });
        })
        .catch(e => {
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  };
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
          <ButtonComponent onPress={handleSelectAvatar} padding={0}>
            <ImageComponent
              resizeMode={'cover'}
              borderRadius={90}
              src={
                infor.avatar !== ''
                  ? {uri: imageUrl + infor.avatar}
                  : require('../../assets/icons/user-avatar.png')
              }
              height={80}
              width={80}
            />
          </ButtonComponent>
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
            marginTop={15}
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
