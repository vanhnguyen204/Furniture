import React from 'react';
import {FlatList, ImageRequireSource, Modal} from 'react-native';
import Box from './Box.tsx';
import TextComponent from './TextComponent.tsx';
import {appColors} from '../assets/colors/appColors.ts';
import ImageComponent from './ImageComponent.tsx';
import ButtonComponent from './ButtonComponent.tsx';
export interface BankType {
  image: ImageRequireSource;
  type: string;
  name: string;
}
interface ModalBottomBankProps {
  data: BankType[];
  isShow: boolean;
  onClose: () => void;
  onItemPress: (bank: BankType) => void;
}
const ModalBottomBank = (props: ModalBottomBankProps) => {
  const {data, isShow, onItemPress, onClose} = props;
  const handleItemSelected = (bank: BankType) => {
    onItemPress(bank);
    onClose();
  };
  return (
    <Modal visible={isShow} transparent={true} animationType={'fade'}>
      <ButtonComponent
        name={'Close modal'}
        opacity={0}
        onPress={onClose}
        flex={1}
      />
      <Box
        radius={10}
        overflow={'hidden'}
        justifyContent={'flex-end'}
        backgroundColor={appColors.transparent}>
        <Box
          backgroundColor={appColors.brown}
          paddingBottom={50}
          paddingHorizontal={10}>
          <Box
            justifyContent={'center'}
            flexDirection={'row'}
            alignItems={'center'}>
            <TextComponent
              value={'Choose your bank'}
              fontSize={18}
              marginVertical={10}
              alignSelf={'center'}
              color={appColors.white}
            />
            <ButtonComponent
              position={'absolute'}
              end={0}
              nameColor={appColors.red}
              padding={0}
              name={'Cancel'}
              onPress={onClose}
            />
          </Box>
          <FlatList
            horizontal={true}
            keyExtractor={item => item.type}
            data={data}
            renderItem={({item}) => (
              <ButtonComponent
                padding={0}
                name={item.name}
                onPress={() => {
                  handleItemSelected(item);
                }}
                // backgroundColor={appColors.grays.gray300}
                marginRight={10}
                alignItems={'center'}
                justifyContent={'center'}
                marginHorizontal={7}
                marginVertical={10}>
                <ImageComponent
                  alignSelf={'center'}
                  width={40}
                  height={40}
                  borderRadius={10}
                  src={item.image}
                />
                <TextComponent value={item.name} fontSize={14} marginTop={10} />
              </ButtonComponent>
            )}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalBottomBank;
