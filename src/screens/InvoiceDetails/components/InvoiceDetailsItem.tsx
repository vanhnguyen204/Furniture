import React from 'react';
import Product from '../../../models/Product.ts';
import Box from '../../../components/Box.tsx';
import ImageComponent from '../../../components/ImageComponent.tsx';
import {imageUrl} from '../../../utils/ip.ts';
import {appColors} from '../../../assets/colors/appColors.ts';
import TextComponent from '../../../components/TextComponent.tsx';
interface InvoiceItemDetailsProps {
  item: Product;
}
const InvoiceDetailsItem = (props: InvoiceItemDetailsProps) => {
  const {item} = props;
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
      <Box marginLeft={10}>
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
      </Box>
    </Box>
  );
};

export default InvoiceDetailsItem;
