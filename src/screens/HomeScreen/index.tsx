import React, {useCallback, useEffect, useState} from 'react';
import Container from '../../components/Container.tsx';
import Header from './components/Header.tsx';
import Categories from './components/Categories.tsx';
import ListProduct from './components/ListProduct.tsx';
import {useStoreGlobal} from '../../hooks/useStoreGlobal.ts';
import {
  fetchAllData,
  getProductsByCategory,
} from '../../services/api/product.ts';
import {navigatePush} from '../../utils/navigationUtils.ts';
import {PageName} from '../../config/pageName.ts';
import ModalSearch from '../../components/ModalSearch.tsx';
import Box from '../../components/Box.tsx';
import TextComponent from '../../components/TextComponent.tsx';
import {appColors} from '../../assets/colors/appColors.ts';

const HomeScreen = () => {
  const {products, setProducts} = useStoreGlobal();
  const [visibleModalSearch, setVisibleModalSearch] = useState(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const toggleModalSearch = () =>
    setVisibleModalSearch(prevState => !prevState);
  const onRefresh = useCallback(async () => {
    setRefreshing(true); // Start refreshing indicator
    fetchAllData()
      .then(res => {
        // @ts-ignore
        setProducts(res);
      })
      .catch(e => {
        console.log(e);
      })
      .finally(() => {
        setRefreshing(false);
      });
  }, [setProducts]);
  const onCategorySelected = (type: string) => {
    getProductsByCategory(type)
      .then(res => {
        // @ts-ignore
        setProducts(res);
      })
      .catch(e => {
        console.log(e);
      });
  };
  useEffect(() => {
    fetchAllData()
      .then(res => {
        // @ts-ignore
        setProducts(res);
      })
      .catch(e => {
        console.log(e);
      });
  }, [setProducts]);
  return (
    <Container>
      <ModalSearch onClose={toggleModalSearch} visible={visibleModalSearch} />
      <Header
        onSearch={toggleModalSearch}
        onCart={() => {
          navigatePush('Cart');
        }}
      />
      <Categories
        onItemSelected={(type: string) => {
          onCategorySelected(type);
        }}
      />
      {products.length === 0 ? (
        <Box flex={1} justifyContent={'center'}>
          <TextComponent
            alignSelf={'center'}
            value={'This category has no products.'}
            color={appColors.black900}
          />
        </Box>
      ) : (
        <ListProduct
          onRefresh={onRefresh}
          refresh={refreshing}
          column={2}
          data={products}
        />
      )}
    </Container>
  );
};

export default HomeScreen;
