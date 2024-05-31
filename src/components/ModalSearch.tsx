import React, {useEffect, useRef, useState} from 'react';
import {FlatList, Modal, TextInput} from 'react-native';
import Container from './Container.tsx';
import InputComponent from './InputComponent.tsx';
import Box from './Box.tsx';
import ButtonComponent from './ButtonComponent.tsx';
import {appColors} from '../assets/colors/appColors.ts';
import {searchProduct} from '../services/api/product.ts';
import ItemSearch from '../screens/HomeScreen/components/ItemSearch.tsx';
interface ModalSearchProps {
  visible: boolean;
  onClose: () => void;
}
const ModalSearch = (props: ModalSearchProps) => {
  const {visible, onClose} = props;
  const inputSearchRef = useRef<TextInput>(null);
  const [valueSearch, setValueSearch] = useState('');
  const [dataSearchResponse, setDataSearchResponse] = useState([]);
  useEffect(() => {
    inputSearchRef?.current && inputSearchRef?.current.focus();
  }, [visible]);
  useEffect(() => {
    setDataSearchResponse([]);
  }, [visible]);
  return (
    <Modal visible={visible} animationType={'fade'}>
      <Container>
        <Box flexDirection={'row'} marginHorizontal={10}>
          <InputComponent
            inputRef={inputSearchRef}
            flex={1}
            value={valueSearch}
            placeholderTextColor={appColors.grays.gray450}
            placeholder={'Search...'}
            textColor={appColors.black900}
            onChangeText={(value: string) => {
              setValueSearch(value);
              searchProduct(value)
                .then(res => {
                  // @ts-ignore
                  setDataSearchResponse(res);
                })
                .catch(e => {
                  console.log(e);
                });
            }}
          />
          <ButtonComponent
            padding={0}
            name={'cancel'}
            nameColor={appColors.blue500}
            onPress={onClose}
          />
        </Box>
        <FlatList
          data={dataSearchResponse}
          renderItem={({item}) => (
            <ItemSearch closeModal={onClose} item={item} />
          )}
        />
      </Container>
    </Modal>
  );
};

export default ModalSearch;
