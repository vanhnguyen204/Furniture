import React, {useEffect, useState} from 'react';
import Container from '../../components/Container.tsx';
import Box from '../../components/Box.tsx';
import Header from '../../components/Header.tsx';
import ButtonComponent from '../../components/ButtonComponent.tsx';
import ImageComponent from '../../components/ImageComponent.tsx';
import {goBackNavigation, navigatePush} from '../../utils/navigationUtils.ts';
import {appColors} from '../../assets/colors/appColors.ts';
import {fetchMyProduct} from '../../services/api/product.ts';
import {FlatList} from 'react-native';
import MyProductItem from './components/MyProductItem.tsx';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../navigators/RootStackParamList.ts';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import TextComponent from '../../components/TextComponent.tsx';
type CheckoutScreenRouteProp = RouteProp<RootStackParamList, 'MyProducts'>;
type CheckoutScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MyProducts'
>;

type Props = {
  route: CheckoutScreenRouteProp;
  navigation: CheckoutScreenNavigationProp;
};
const MyProducts = (props: Props) => {
  const {navigation} = props;
  const [myProducts, setMyProducts] = useState([]);
  useEffect(() => {
    const unsub = navigation.addListener('focus', () => {
      fetchMyProduct()
        .then(res => {
          // @ts-ignore
          setMyProducts(res);
        })
        .catch(e => {
          console.log(e);
        });
    });
    return () => {
      unsub();
    };
  }, [navigation]);
  return (
    <Container>
      <Box flex={1}>
        <Box justifyContent={'center'}>
          <Header
            iconLeft={require('../../assets/icons/left.png')}
            onLeftPress={() => goBackNavigation()}
            title={'My Products'}
            colorTitle={appColors.black900}
            fontSizeTitle={18}
            fontWeight={'600'}
          />
          <ButtonComponent
            position={'absolute'}
            end={20}
            name={'User manual'}
            onPress={() => {
              navigatePush('Statistical');
            }}
            padding={0}>
            <ImageComponent
              alignSelf={'center'}
              src={require('../../assets/icons/statistics.png')}
              width={25}
              height={25}
            />
          </ButtonComponent>
        </Box>
        {myProducts.length === 0 ? (
          <Box flex={1} alignItems={'center'} justifyContent={'center'}>
            <TextComponent
              alignSelf={'center'}
              color={appColors.black900}
              value={'You have not any products.'}
            />
          </Box>
        ) : (
          <FlatList
            style={{flex: 1}}
            numColumns={2}
            data={myProducts}
            renderItem={({item}) => <MyProductItem item={item} />}
          />
        )}
      </Box>
      <ButtonComponent
        position={'absolute'}
        bottom={50}
        end={20}
        backgroundColor={appColors.grays.gray400}
        alignSelf={'flex-end'}
        name={'Add product'}
        onPress={() => {
          navigatePush('ManageMyProducts', {isCreate: true});
        }}>
        <ImageComponent
          src={require('../../assets/icons/plus_child.png')}
          height={20}
          width={20}
        />
      </ButtonComponent>
    </Container>
  );
};

export default MyProducts;
