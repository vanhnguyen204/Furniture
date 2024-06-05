import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../components/Container';
import Header from '../../components/Header';
import {appColors} from '../../assets/colors/appColors';
import {getMyInvoice} from '../../services/api/invoice';
import Invoice from '../../models/Invoice';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../navigators/RootStackParamList.ts';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Box from '../../components/Box.tsx';
import TextComponent from '../../components/TextComponent.tsx';
import InvoiceItem from './components/InvoiceItem.tsx';
import {goBackNavigation} from '../../utils/navigationUtils.ts';

type CheckoutScreenRouteProp = RouteProp<
  RootStackParamList,
  'ProductDetailsScreen'
>;
type CheckoutScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Checkout'
>;

type Props = {
  route: CheckoutScreenRouteProp;
  navigation: CheckoutScreenNavigationProp;
};
const HistoryPurchase = (props: Props) => {
  const {navigation} = props;
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const getInvoice = () => {
    getMyInvoice()
      .then(res => {
        // @ts-ignore
        setInvoices(res);
      })
      .catch(e => {
        console.log(e);
      });
  };
  useEffect(() => {
    const unsub = navigation.addListener('focus', () => {
      getInvoice();
    });
    return () => {
      unsub();
    };
  }, [navigation]);

  return (
    <Container>
      <Header
        iconLeft={require('../../assets/icons/left.png')}
        sizeIconLeft={30}
        title="History purchase"
        colorTitle={appColors.black900}
        fontSizeTitle={16}
        fontWeight="600"
        onLeftPress={() => {
          goBackNavigation();
        }}
      />

      {invoices.length === 0 && (
        <Box flex={1}>
          <TextComponent
            value={
              'Purchase history is empty, you have not purchased any products.'
            }
          />
        </Box>
      )}
      <FlatList
        data={invoices}
        renderItem={({item, index}) => <InvoiceItem item={item} />}
      />
    </Container>
  );
};

export default HistoryPurchase;
