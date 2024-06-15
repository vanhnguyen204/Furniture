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
import {navigatePush} from '../../utils/navigationUtils.ts';
import TextComponent from '../../components/TextComponent.tsx';

const MarkScreen = () => {
  const {myFavorites, setMyFavorites} = useUserInformation();
  const searchRef = useRef<TextInput>(null);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      const favoriteRes = await fetchFavoriteProductsByUser();
      setMyFavorites(favoriteRes);
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  }, [setMyFavorites]);
  useEffect(() => {
    fetchFavoriteProductsByUser()
      .then(res => {
        setMyFavorites(res);
      })
      .catch(() => {});
  }, [setMyFavorites]);
  return (
    <Container>
      <Header
        onLeftPress={() => {}}
        title={'Favorite'}
        fontSizeTitle={16}
        fontWeight={'600'}
        colorTitle={appColors.black900}
        iconRight={require('../../assets/icons/cart.png')}
        sizeIconRight={25}
        onRightPress={() => navigatePush('Cart')}
      />
      {myFavorites.length === 0 ? (
        <Box flex={1}>
          <TextComponent
            alignSelf={'center'}
            value={"You don't like any product"}
            color={appColors.black900}
          />
        </Box>
      ) : (
        <ListFavorites
          refreshing={refreshing}
          onRefresh={onRefresh}
          data={myFavorites}
        />
      )}
    </Container>
  );
};

export default MarkScreen;
