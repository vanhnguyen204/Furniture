import React, {useState} from 'react';
import Box from '../../../components/Box.tsx';
import {FlatList, ImageRequireSource} from 'react-native';
import ImageComponent from '../../../components/ImageComponent.tsx';
import TextComponent from '../../../components/TextComponent.tsx';
import ButtonComponent from '../../../components/ButtonComponent.tsx';
import {appColors} from '../../../assets/colors/appColors.ts';

interface CategoryItemProps {
  id: number;
  image: ImageRequireSource;
  type: string;
  name: string;
}
const Categories = () => {
  const [isSelected, setIsSelected] = useState(0);
  const categoriesData = [
    {
      id: 1,
      image: require('../../../assets/icons/star.png'),
      type: 'popular',
      name: 'Popular',
    },
    {
      id: 2,
      image: require('../../../assets/icons/chair.png'),
      type: 'chair',
      name: 'Chair',
    },
    {
      id: 3,
      image: require('../../../assets/icons/side-table.png'),
      type: 'table',
      name: 'Table',
    },
    {
      id: 4,
      image: require('../../../assets/icons/armchair.png'),
      type: 'armchair',
      name: 'ArmChair',
    },
    {
      id: 5,
      image: require('../../../assets/icons/bed.png'),
      type: 'bed',
      name: 'Bed',
    },
    {
      id: 6,
      image: require('../../../assets/icons/bulb.png'),
      type: 'lamp',
      name: 'Lamp',
    },
  ];
  const renderCategory = ({
    item,
    index,
  }: {
    item: CategoryItemProps;
    index: number;
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
            isSelected === index ? appColors.black900 : appColors.grays.gray500
          }
          alignItems={'center'}
          justifyContent={'center'}>
          <ImageComponent
            alignSelf={'center'}
            src={item.image}
            height={30}
            width={30}
            tintColor={
              isSelected === index ? appColors.white : appColors.black900
            }
          />
        </Box>
        <TextComponent
          color={
            isSelected === index ? appColors.black900 : appColors.grays.gray500
          }
          value={item.name}
        />
      </ButtonComponent>
    );
  }
  return (
    <Box>
      <FlatList
        horizontal={true}
        keyExtractor={item => item.id.toString()}
        data={categoriesData}
        renderItem={renderCategory}
      />
    </Box>
  );
};

export default Categories;
