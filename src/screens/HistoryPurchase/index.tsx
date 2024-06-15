import {FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../components/Container';
import Header from '../../components/Header';
import {appColors} from '../../assets/colors/appColors';
import {getMyInvoice} from '../../services/api/invoice';
import Invoice from '../../models/Invoice';
import Box from '../../components/Box.tsx';
import TextComponent from '../../components/TextComponent.tsx';
import InvoiceItem from './components/InvoiceItem.tsx';
import {goBackNavigation} from '../../utils/navigationUtils.ts';

const HistoryPurchase = (props: {navigation: any}) => {
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
        iconLeft={undefined}
        sizeIconLeft={30}
        title="History purchase"
        colorTitle={appColors.black900}
        fontSizeTitle={16}
        fontWeight="600"
        onLeftPress={() => {
          goBackNavigation();
        }}
      />

      {invoices.length === 0 ? (
        <Box flex={1} alignItems={'center'} justifyContent={'center'}>
          <TextComponent
            alignSelf={'center'}
            color={appColors.black900}
            value={
              'Purchase history is empty, you have not purchased any products.'
            }
          />
        </Box>
      ) : (
        <FlatList
          keyExtractor={item => item._id}
          data={invoices}
          renderItem={({item}) => <InvoiceItem item={item} />}
        />
      )}
    </Container>
  );
};

export default HistoryPurchase;
