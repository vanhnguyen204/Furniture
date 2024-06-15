import React, {useEffect, useState} from 'react';
import Container from '../../components/Container.tsx';
import Header from '../../components/Header.tsx';
import {goBackNavigation} from '../../utils/navigationUtils.ts';
import {appColors} from '../../assets/colors/appColors.ts';
import TextComponent from '../../components/TextComponent.tsx';
import ButtonComponent from '../../components/ButtonComponent.tsx';
import ImageComponent from '../../components/ImageComponent.tsx';
import Box from '../../components/Box.tsx';
import CardInfor from '../../components/CardInfor.tsx';
import {useUserInformation} from '../../hooks/useUserInformation.ts';
import {getInfor, updateInfor} from '../../services/api/auth.ts';

const Setting = ({navigation}) => {
  const {infor, setInfor} = useUserInformation();
  const [name, setName] = useState(infor.name);
  const [email, setEmail] = useState(infor.email);
  const [passWord, setPassWord] = useState('123456789');
  const [editableInfor, setEditableInfor] = useState(false);
  const [editablePass, setEditablePass] = useState(false);
  return (
    <Container>
      <Header
        iconLeft={require('../../assets/icons/left.png')}
        sizeIconLeft={30}
        onLeftPress={() => goBackNavigation()}
        title={'Setting'}
        colorTitle={appColors.black900}
        fontSizeTitle={18}
        fontWeight={'600'}
      />
      <Box
        paddingTop={15}
        paddingHorizontal={20}
        flexDirection={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}>
        <TextComponent
          value={'Personal Information'}
          color={appColors.grays.gray500}
          fontSize={18}
          fontWeight={'500'}
        />
        <ButtonComponent
          name={'Pen edit infor user'}
          onPress={() => {
            setEditableInfor(prevState => !prevState);
            if (editableInfor) {
              updateInfor(name, passWord)
                .then(() => {
                  setInfor({
                    ...infor,
                    name: name,
                  });
                })
                .catch(e => {
                  console.log(e.toString());
                });
            }
          }}>
          <ImageComponent
            src={
              editableInfor
                ? require('../../assets/icons/tick.png')
                : require('../../assets/icons/pen_icon.png')
            }
            tintColor={editableInfor ? '#46E661' : '#000000'}
            height={20}
            width={20}
          />
        </ButtonComponent>
      </Box>
      <CardInfor
        value={name}
        editable={editableInfor}
        onValueChange={value => setName(value)}
        label={'Name'}
        isPassWord={false}
      />
      <CardInfor
        editable={false}
        value={email}
        label={'Email'}
        onValueChange={value => setEmail(value)}
        isPassWord={false}
      />

      <Box
        paddingTop={15}
        paddingHorizontal={20}
        flexDirection={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}>
        <TextComponent
          value={'Password'}
          color={appColors.grays.gray500}
          fontSize={18}
          fontWeight={'500'}
        />
        <ButtonComponent
          name={'Pen update pass'}
          onPress={() => {
            setEditablePass(prevState => !prevState);
          }}>
          <ImageComponent
            src={
              editablePass
                ? require('../../assets/icons/tick.png')
                : require('../../assets/icons/pen_icon.png')
            }
            tintColor={editablePass ? '#46E661' : '#000000'}
            height={20}
            width={20}
          />
        </ButtonComponent>
      </Box>
      <CardInfor
        value={passWord}
        editable={editablePass}
        onValueChange={value => setPassWord(value)}
        label={'Pass'}
        isPassWord={true}
      />
    </Container>
  );
};

export default Setting;
