import React, {useCallback, useEffect, useState} from 'react';
import Container from '../../components/Container.tsx';
import Header from '../../components/Header.tsx';
import {goBackNavigation} from '../../utils/navigationUtils.ts';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../navigators/RootStackParamList.ts';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {getInvoiceDetails} from '../../services/api/invoice.ts';
import Box from '../../components/Box.tsx';
import {ActivityIndicator, FlatList} from 'react-native';
import {appColors} from '../../assets/colors/appColors.ts';
import TextComponent from '../../components/TextComponent.tsx';
import Product from '../../models/Product.ts';
import InvoiceDetailsItem from './components/InvoiceDetailsItem.tsx';
import ModalReview from './components/ModalReview.tsx';
type CheckoutScreenRouteProp = RouteProp<RootStackParamList, 'InvoiceDetails'>;
type CheckoutScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'InvoiceDetails'
>;

type Props = {
  route: CheckoutScreenRouteProp;
  navigation: CheckoutScreenNavigationProp;
};
const InvoiceDetails = (props: Props) => {
  const {route, navigation} = props;
  const {invoice} = route.params;
  const [modalReviewVisible, setModalReviewVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [productSelected, setProductSelected] = useState<Product>();
  const getMyInvoiceDetails = useCallback(() => {
    setIsLoading(true);
    getInvoiceDetails(invoice._id)
      .then(res => {
        setIsLoading(false);
        // @ts-ignore
        setProducts(res);
      })
      .catch(e => {
        setIsLoading(false);
        console.log(e);
      });
  }, [invoice._id]);
  const toggleModalReview = () => {
    setModalReviewVisible(prevState => !prevState);
  };
  useEffect(() => {
    getMyInvoiceDetails();
  }, [getMyInvoiceDetails]);
  return (
    <Container>
      <ModalReview
        product={productSelected}
        visible={modalReviewVisible}
        onClose={toggleModalReview}
      />
      <Header
        iconLeft={require('../../assets/icons/left.png')}
        sizeIconLeft={30}
        colorTitle={appColors.black900}
        fontWeight={'600'}
        fontSizeTitle={16}
        title={'Invoice details'}
        onLeftPress={() => goBackNavigation()}
      />
      {isLoading && (
        <Box flex={1} alignItems={'center'} justifyContent={'center'}>
          <ActivityIndicator color={appColors.black900} size={'small'} />
        </Box>
      )}

      <FlatList
        data={products}
        renderItem={({item}) => (
          <InvoiceDetailsItem
            setImageSelected={setProductSelected}
            item={item}
            toggleModalReview={toggleModalReview}
          />
        )}
      />
    </Container>
  );
};

export default InvoiceDetails;
