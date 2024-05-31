import React, {useCallback, useEffect, useRef, useState} from 'react';
import Container from '../../components/Container.tsx';
import Header from '../../components/Header.tsx';
import Box from '../../components/Box.tsx';
import ButtonComponent from '../../components/ButtonComponent.tsx';
import {appColors} from '../../assets/colors/appColors.ts';

import {TextInput} from 'react-native';
import {useUserInformation} from '../../hooks/useUserInformation.ts';
import ListFavorites from './components/ListFavorites.tsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ACCESS_USER_ID} from '../../constants/AsyncStorage.ts';
import {fetchFavoriteProductsByUser} from '../../services/api/product.ts';
import { navigatePush } from "../../utils/navigationUtils.ts";
import { PageName } from "../../config/pageName.ts";

const MarkScreen = () => {
  const {myFavorites, setMyFavorites} = useUserInformation();
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const searchRef = useRef<TextInput>(null);
  useEffect(() => {
    if (isSearch) {
      searchRef?.current?.focus();
    }
  }, [isSearch]);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      const getUserId = await AsyncStorage.getItem(ACCESS_USER_ID);
      if (getUserId !== null) {
        const favoriteRes = await fetchFavoriteProductsByUser();
        setMyFavorites(favoriteRes);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  }, [setMyFavorites]);
  return (
    <Container>
      {isSearch ? (
        <Box flexDirection={'row'} alignItems={'center'}>
          <TextInput
            style={{flex: 1, marginHorizontal: 10}}
            ref={searchRef}
            placeholder={'Search...'}
            placeholderTextColor={appColors.grays.gray500}
          />
          <ButtonComponent
            nameColor={appColors.blue500}
            name={'Huỷ'}
            onPress={() => setIsSearch(prevState => !prevState)}
          />
        </Box>
      ) : (
        <Header
          onLeftPress={() => {
            setIsSearch(prevState => !prevState);
          }}
          iconLeft={require('../../assets/icons/search_2.png')}
          iconRight={require('../../assets/icons/cart.png')}
          sizeIconRight={25}
          onRightPress={() => navigatePush('Cart')}
        />
      )}
      <ListFavorites
        refreshing={refreshing}
        onRefresh={onRefresh}
        data={myFavorites}
      />
    </Container>
  );
};

export default MarkScreen;
