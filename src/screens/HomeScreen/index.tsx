import React from 'react';
import Container from '../../components/Container.tsx';
import TextComponent from '../../components/TextComponent.tsx';
import Header from './components/Header.tsx';
import Categories from './components/Categories.tsx';
import ListProduct from './components/ListProduct.tsx';

const HomeScreen = () => {
  const data = [
    {
      id: 1,
      image: require('../../assets/images/chair-product.png'),
      name: 'Coffee Chair',
      type: 'chair',
      price: 20,
    },
    {
      id: 2,
      image: require('../../assets/images/lamp-product.png'),
      name: 'Black Simple Lamp',
      type: 'lamp',
      price: 25,
    },
    {
      id: 3,
      image: require('../../assets/images/table.png'),
      name: 'Minimal Stand',
      type: 'table',
      price: 15,
    },
    {
      id: 4,
      image: require('../../assets/images/table-desk.png'),
      name: 'Table Desk',
      type: 'table',
      price: 30,
    },
  ];
  return (
    <Container>
      <Header onSearch={() => {}} onCart={() => {}} />
      <Categories />
      <ListProduct column={2} data={data} />
    </Container>
  );
};

export default HomeScreen;
