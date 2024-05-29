import React, {memo} from 'react';
import Box from '../../../components/Box.tsx';
import TextComponent from '../../../components/TextComponent.tsx';
import Address from '../../../models/Address.ts';
import CheckBox from '../../../components/CheckBox.tsx';
import {useUserInformation} from '../../../hooks/useUserInformation.ts';
import {appColors} from '../../../assets/colors/appColors.ts';
import ButtonComponent from '../../../components/ButtonComponent.tsx';
import ImageComponent from '../../../components/ImageComponent.tsx';
import {View} from 'react-native';
import {activeShippingAddress} from '../../../services/api/shippingAddress.ts';

interface ItemShoppingAddressProps {
  item: Address;
  index: number;
  onUpdate: (item: Address) => void;
  onRemove: (id: string) => void;
}
const ItemShoppingAddress = (props: ItemShoppingAddressProps) => {
  const {item, index, onUpdate, onRemove} = props;
  const {setMyAddress, myAddresses} = useUserInformation();
  const handleUpdateStatus = async (value: boolean) => {
    try {
      await activeShippingAddress(item._id);
      const filter: Address[] = myAddresses.map((address, i): Address => {
        if (i === index) {
          address.isSelected = value;
        } else {
          address.isSelected = false;
        }
        return address;
      });
      setMyAddress(filter);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Box marginHorizontal={20}>
      <Box flexDirection={'row'}>
        <CheckBox
          isChecked={item.isSelected}
          onCheck={value => {
            handleUpdateStatus(value);
          }}
        />
        <Box flexDirection={'row'} justifyContent={'space-between'} flex={1}>
          <TextComponent
            value={'Use as the shipping address'}
            fontSize={18}
            fontWeight={'400'}
            color={appColors.black900}
            marginLeft={10}
          />
          <ButtonComponent name={'Delete'} onPress={() => onRemove(item._id)}>
            <ImageComponent
              src={require('../../../assets/icons/trash-bin.png')}
              width={25}
              height={25}
            />
          </ButtonComponent>
        </Box>
      </Box>

      <Box
        radius={5}
        marginTop={15}
        marginBottom={30}
        backgroundColor={appColors.white}>
        <Box
          paddingTop={15}
          paddingHorizontal={20}
          flexDirection={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}>
          <TextComponent
            value={item.recipient}
            color={appColors.black900}
            fontSize={18}
            fontWeight={'700'}
          />
          <ButtonComponent
            name={'Pen update address'}
            onPress={() => {
              onUpdate(item);
            }}>
            <ImageComponent
              src={require('../../../assets/icons/pen_icon.png')}
              height={20}
              width={20}
            />
          </ButtonComponent>
        </Box>
        <Box
          marginVertical={10}
          flex={1}
          height={1}
          backgroundColor={appColors.grays.gray300}>
          <View />
        </Box>
        <TextComponent
          maxLine={2}
          marginHorizontal={20}
          marginBottom={15}
          color={appColors.grays.gray450}
          value={
            item.addressDetail +
            ', ' +
            item.district +
            ', ' +
            item.city +
            ', ' +
            item.country
          }
        />
      </Box>
    </Box>
  );
};

export default memo(ItemShoppingAddress);
