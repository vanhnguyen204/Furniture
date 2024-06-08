import React, {useCallback} from 'react';
import Invoice from '../../../models/Invoice.ts';
import Box from '../../../components/Box.tsx';
import TextComponent from '../../../components/TextComponent.tsx';
import {appColors} from '../../../assets/colors/appColors.ts';
import ButtonComponent from '../../../components/ButtonComponent.tsx';
import {navigatePush} from '../../../utils/navigationUtils.ts';
import {calculateTimeDifference} from '../../../utils/DateTime.ts';
interface InvoiceItemProps {
  item: Invoice;
}
const InvoiceItem = (props: InvoiceItemProps) => {
  const {item} = props;

  return (
    <Box
      marginHorizontal={20}
      marginVertical={10}
      backgroundColor={appColors.white}
      padding={10}
      radius={10}>
      <Box>
        <TextComponent
          value={`Order No: ${item._id}`}
          color={appColors.black900}
        />
        <TextComponent
          marginTop={5}
          value={calculateTimeDifference(item.dateExport)}
          color={appColors.blue500}
        />
      </Box>
      <Box
        flexDirection={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        marginTop={20}>
        <Box flexDirection={'row'} alignItems={'center'}>
          <TextComponent value={'Total price: '} color={appColors.black900} />
          <TextComponent
            value={`$ ${item.totalPrice}.0`}
            color={'#7CB342'}
            fontWeight={'600'}
            fontSize={18}
          />
        </Box>
        <ButtonComponent
          fontSize={12}
          borderRadius={5}
          paddingVertical={5}
          name={'Detail'}
          onPress={() => {
            navigatePush('InvoiceDetails', {invoice: item});
          }}
          nameColor={appColors.white}
          backgroundColor={appColors.black900}
        />
      </Box>
    </Box>
  );
};

export default InvoiceItem;
