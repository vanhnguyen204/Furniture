import React, {memo} from 'react';
import ButtonComponent from '../../../components/ButtonComponent.tsx';
import Box from '../../../components/Box.tsx';
import {appColors} from '../../../assets/colors/appColors.ts';
import ImageComponent from '../../../components/ImageComponent.tsx';
import TextComponent from '../../../components/TextComponent.tsx';
import {ImageRequireSource} from 'react-native';
interface CategoryItemProps {
  id: number;
  image: ImageRequireSource;
  type: string;
  name: string;
}
const CategoryItem = ({
  item,
  index,
  setIsSelected,
  isSelected,
}: {
  item: CategoryItemProps;
  index: number;
  setIsSelected: (index: number) => void;
  isSelected: number;
}) => {
  return (
    <ButtonComponent
      marginHorizontal={5}
      name={`Click ${index}`}
      alignItems={'center'}
      onPress={() => {
        setIsSelected(index);
      }}>
      <Box
        padding={10}
        radius={20}
        backgroundColor={
          isSelected === index ? appColors.black900 : appColors.grays.gray300
        }
        alignItems={'center'}
        justifyContent={'center'}>
        <ImageComponent
          alignSelf={'center'}
          src={item.image}
          height={25}
          width={25}
          tintColor={
            isSelected === index ? appColors.white : appColors.black900
          }
        />
      </Box>
      <TextComponent
        marginTop={5}
        color={
          isSelected === index ? appColors.black900 : appColors.grays.gray500
        }
        value={item.name}
      />
    </ButtonComponent>
  );
};

export default memo(CategoryItem);
