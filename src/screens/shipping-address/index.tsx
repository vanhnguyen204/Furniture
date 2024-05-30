import React, {useCallback, useState} from 'react';
import Container from '../../components/Container.tsx';
import Header from '../../components/Header.tsx';
import {appColors} from '../../assets/colors/appColors.ts';
import {goBackNavigation} from '../../utils/navigationUtils.ts';
import Box from '../../components/Box.tsx';
import ImageComponent from '../../components/ImageComponent.tsx';
import ButtonComponent from '../../components/ButtonComponent.tsx';
import FormShippingAddress from '../../components/FormShippingAddress.tsx';
import {useUserInformation} from '../../hooks/useUserInformation.ts';
import {Alert, FlatList} from 'react-native';
import ItemShoppingAddress from './components/ItemShoppingAddress.tsx';
import Address from '../../models/Address.ts';
import Spacer from '../../components/Spacer.tsx';
import {
  createShippingAddress,
  removeMyShippingAddress,
} from '../../services/api/shippingAddress.ts';

const ShippingAddress = () => {
  const feats: string[] = [
    'country',
    'city',
    'district',
    'addressDetail',
    'recipient',
  ];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModal = useCallback(() => {
    setIsModalVisible(prevState => !prevState);
  }, []);
  const {setMyAddress, myAddresses} = useUserInformation();
  const [addressUpdating, setAddressUpdating] = useState<Address>({
    country: '',
    city: '',
    district: '',
    addressDetail: '',
    _id: '',
    isSelected: false,
    recipient: '',
  });
  const [isCreate, setIsCreate] = useState(false);
  const handleUpdateShippingAddress = useCallback(
    (address: Address) => {
      toggleModal();
      setIsCreate(false);
      setAddressUpdating(prevState => ({
        ...prevState,
        country: address.country,
        city: address.city,
        district: address.district,
        addressDetail: address.addressDetail,
        recipient: address.recipient,
        _id: address._id,
      }));
    },
    [toggleModal],
  );
  return (
    <Container justifyContent={'space-between'} alignItems={'flex-end'}>
      <FormShippingAddress
        onConfirm={async (inputValues, initialValues) => {
          try {
            const address: Address = {
              ...inputValues,
              _id: '',
              isSelected: false,
            };
            if (isCreate) {
              const response = await createShippingAddress(address);
              // @ts-ignore
              setMyAddress(myAddresses, response.newAddress);
              console.log(myAddresses);
            } else {
              const filter = myAddresses.map((item: Address) => {
                if (item._id === initialValues?._id) {
                  item.country = inputValues.country;
                  item.city = inputValues.city;
                  item.district = inputValues.district;
                  item.addressDetail = inputValues.addressDetail;
                  item.recipient = inputValues.recipient;
                }
                return item;
              });
              setMyAddress(filter);
            }
            setIsCreate(false);
          } catch (e) {
            console.log(e);
            Alert.alert(
              'Notification',
              'A shipping address cannot be created at this time, please try again.',
            );
          }
        }}
        title={'Add new shipping address'}
        feats={feats}
        isVisible={isModalVisible}
        onClose={toggleModal}
        initialValues={addressUpdating}
      />
      <Box alignSelf={'stretch'}>
        <Header
          iconLeft={require('../../assets/icons/left.png')}
          sizeIconLeft={30}
          title={'Shipping Address'}
          colorTitle={appColors.black900}
          fontSizeTitle={16}
          fontWeight={'600'}
          onLeftPress={() => {
            goBackNavigation();
          }}
        />
        <Spacer height={20} />
        <FlatList
          data={myAddresses}
          renderItem={({item, index}) => {
            return (
              <ItemShoppingAddress
                onRemove={(id: string) => {
                  Alert.alert(
                    'Notification',
                    'Are you sure want to remove shipping address?',
                    [
                      {
                        text: 'Cancel',
                      },
                      {
                        text: 'Remove',
                        onPress: () => {
                          removeMyShippingAddress(id)
                            .then(() => {
                              const filter = myAddresses.filter(it => {
                                return it._id !== id;
                              });
                              setMyAddress(filter);
                            })
                            .catch(e => {
                              console.log(e);
                            });
                        },
                      },
                    ],
                  );
                }}
                onUpdate={handleUpdateShippingAddress}
                item={item}
                index={index}
              />
            );
          }}
        />
      </Box>

      <Box
        position={'relative'}
        marginVertical={20}
        marginHorizontal={20}
        backgroundColor={appColors.grays.gray300}
        radius={50}>
        <ButtonComponent
          padding={15}
          name={'Add shipping address'}
          onPress={() => {
            toggleModal();
            setIsCreate(true);
          }}>
          <ImageComponent
            src={require('../../assets/icons/plus_child.png')}
            height={20}
            width={20}
          />
        </ButtonComponent>
      </Box>
    </Container>
  );
};

export default ShippingAddress;
