import React, {memo, useCallback} from 'react';
import {Alert, FlatList} from 'react-native';
import ItemFavorite from './ItemFavorite.tsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ACCESS_USER_ID} from '../../../constants/AsyncStorage.ts';
import {deleteFavorite} from '../../../services/api/product.ts';
import {useUserInformation} from '../../../hooks/useUserInformation.ts';
interface ListProps {
  data: [];
  refreshing: boolean;
  onRefresh: () => void;
}
const ListFavorites = (props: ListProps) => {
  const {data, refreshing, onRefresh} = props;
  const {setMyFavorites} = useUserInformation();
  const handleDeleteFavorite = useCallback(
    async (productId: string) => {
      try {
        const getUserId = await AsyncStorage.getItem(ACCESS_USER_ID);
        if (getUserId !== null) {
          await deleteFavorite(productId, getUserId);
          const filterFav = data.filter(item => {
            // @ts-ignore
            return item?._id !== productId;
          });
          setMyFavorites(filterFav);
          Alert.alert('Thông báo', 'Xoá thành công.');
        }
      } catch (e) {
        console.log(e);
        Alert.alert(
          'Thông báo',
          'Không thể xoá lúc này, vui lòng thử lại sau.',
        );
      }
    },
    [data, setMyFavorites],
  );
  return (
    <FlatList
      refreshing={refreshing}
      onRefresh={onRefresh}
      keyExtractor={(item, index) => index.toString()}
      data={data}
      renderItem={({item, index}) => (
        <ItemFavorite
          handleDeleteFavorite={handleDeleteFavorite}
          item={item}
          index={index}
        />
      )}
    />
  );
};

export default memo(ListFavorites);
