import React, {memo, useState} from 'react';
import Box from '../../../components/Box.tsx';
import {FlatList, ImageRequireSource} from 'react-native';
import ImageComponent from '../../../components/ImageComponent.tsx';
import TextComponent from '../../../components/TextComponent.tsx';
import ButtonComponent from '../../../components/ButtonComponent.tsx';
import {appColors} from '../../../assets/colors/appColors.ts';
import CategoryItem from './CategoryItem.tsx';

interface CategoryProps {
  onItemSelected: (type: string) => void;
}
export const Categories = (props: CategoryProps) => {
  const {onItemSelected} = props;
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
  return (
    <Box>
      <FlatList
        horizontal={true}
        keyExtractor={item => item.id.toString()}
        data={categoriesData}
        renderItem={({item, index}) => (
          <CategoryItem
            item={item}
            index={index}
            isSelected={isSelected}
            setIsSelected={() => {
              setIsSelected(index);
              onItemSelected(item.type);
            }}
          />
        )}
      />
    </Box>
  );
};

export default Categories;
