import React, {useCallback} from 'react';
import Invoice from '../../../models/Invoice.ts';
import Box from '../../../components/Box.tsx';
import TextComponent from '../../../components/TextComponent.tsx';
import {appColors} from '../../../assets/colors/appColors.ts';
import ButtonComponent from '../../../components/ButtonComponent.tsx';
interface InvoiceItemProps {
  item: Invoice;
}
const InvoiceItem = (props: InvoiceItemProps) => {
  const {item} = props;
  const calculateTimeDifference = useCallback(
    (previousTime: string): string => {
      // Tạo đối tượng Date cho thời điểm trước đó
      const previous: Date = new Date(previousTime);

      // Lấy thời gian hiện tại
      const currentTime: Date = new Date();

      // Tính chênh lệch thời gian tính bằng mili giây
      const diffMs: number = currentTime.getTime() - previous.getTime();

      // Chuyển đổi mili giây thành phút và giờ
      const diffMinutes: number = Math.floor(diffMs / 60000); // 1 phút = 60000 mili giây
      const diffHours: number = Math.floor(diffMs / 3600000); // 1 giờ = 3600000 mili giây
      const diffDays: number = Math.floor(diffMs / 86400000);
      // Kiểm tra nếu thời gian chênh lệch nhỏ hơn 1 giờ
      if (diffDays < 1) {
        if (diffMinutes < 1) {
          return 'now';
        } else if (diffHours < 1) {
          return `${diffMinutes}m ago`;
        } else {
          return `${diffHours}h ago`;
        }
      } else {
        return previousTime;
      }
    },
    [],
  );
  return (
    <Box
      marginHorizontal={20}
      marginVertical={10}
      backgroundColor={appColors.white}
      padding={10}
      radius={10}>
      <Box flexDirection={'row'} justifyContent={'space-between'}>
        <TextComponent
          value={`Order No: ${item._id}`}
          color={appColors.black900}
        />
        <TextComponent
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
            color={'#64DD17'}
            fontWeight={'600'}
            fontSize={18}
          />
        </Box>
        <ButtonComponent
          fontSize={12}
          borderRadius={5}
          paddingVertical={5}
          name={'Detail'}
          onPress={() => {}}
          nameColor={appColors.white}
          backgroundColor={appColors.black900}
        />
      </Box>
    </Box>
  );
};

export default InvoiceItem;
