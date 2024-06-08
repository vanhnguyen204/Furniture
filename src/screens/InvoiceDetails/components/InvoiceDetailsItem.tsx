import React from 'react';
import Product from '../../../models/Product.ts';
import Box from '../../../components/Box.tsx';
import ImageComponent from '../../../components/ImageComponent.tsx';
import {imageUrl} from '../../../utils/ip.ts';
import {appColors} from '../../../assets/colors/appColors.ts';
import TextComponent from '../../../components/TextComponent.tsx';
import ButtonComponent from '../../../components/ButtonComponent.tsx';
import {checkReviewed} from '../../../services/api/invoice.ts';
import {Alert} from 'react-native';
interface InvoiceItemDetailsProps {
  item: Product;
  toggleModalReview: () => void;
  setImageSelected: (product: Product) => void;
}
const InvoiceDetailsItem = (props: InvoiceItemDetailsProps) => {
  const {item, toggleModalReview, setImageSelected} = props;
  return (
    <Box
      flexDirection={'row'}
      padding={10}
      radius={10}
      backgroundColor={appColors.white}
      marginVertical={10}
      marginHorizontal={20}>
      <ImageComponent
        src={{uri: imageUrl + item.image}}
        width={80}
        height={80}
        borderRadius={10}
        resizeMode={'cover'}
      />
      <Box marginLeft={10} flex={1}>
        <TextComponent
          fontSize={16}
          fontWeight={'500'}
          value={item.name}
          color={appColors.black900}
        />
        <TextComponent
          marginVertical={5}
          value={`Quantity: ${item.quantity}`}
          color={appColors.black900}
        />
        <TextComponent value={`$ ${item.price}.0`} color={appColors.black900} />
        <ButtonComponent
          bottom={0}
          end={0}
          paddingHorizontal={5}
          alignItems={'center'}
          backgroundColor={'#f2f2f2'}
          flexDirection={'row'}
          onPress={() => {
            checkReviewed(item._id ?? '')
              .then(res => {
                console.log(res);
                // @ts-ignore
                if (!res.isReview) {
                  Alert.alert(
                    'Notification',
                    'You have already rated this product.',
                  );
                } else {
                  setImageSelected(item);
                  toggleModalReview();
                }
              })
              .catch(e => {
                console.log(e);
              });
          }}
          position={'absolute'}
          name={'Rating & reviews'}
          fontSize={12}
          nameColor={appColors.blue500}
        />
      </Box>
    </Box>
  );
};

export default InvoiceDetailsItem;
