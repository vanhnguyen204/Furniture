import React, {useCallback, useState} from 'react';
import Container from '../../components/Container.tsx';
import Header from './components/Header.tsx';
import Categories from './components/Categories.tsx';
import ListProduct from './components/ListProduct.tsx';
import {useStoreGlobal} from '../../hooks/useStoreGlobal.ts';
import {fetchAllData} from '../../services/api/product.ts';
import {navigatePush} from '../../utils/navigationUtils.ts';
import {PageName} from '../../config/pageName.ts';

const HomeScreen = () => {
  const {products, setProducts} = useStoreGlobal();
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true); // Start refreshing indicator
    fetchAllData()
      .then(res => {
        // @ts-ignore
        setProducts(res);
        console.log('onRefresh');
      })
      .catch(e => {
        console.log(e);
      })
      .finally(() => {
        setRefreshing(false);
      });
    console.log('onRefresh');
  }, [setProducts]);

  return (
    <Container>
      <Header
        onSearch={() => {}}
        onCart={() => {
          navigatePush(PageName.Cart);
        }}
      />
      <Categories />
      <ListProduct
        onRefresh={onRefresh}
        refresh={refreshing}
        column={2}
        data={products}
      />
    </Container>
  );
};

export default HomeScreen;
