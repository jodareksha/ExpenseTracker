import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import {DimenHeight, DimenWidth} from '../../utils/Dimensions';

type DataItems = {
  category: string;
  id?: number;
  value?: string;
};

type Selecet_Props = {
  data: DataItems[];
  holder?: string;
  onSelected?: any;
};

const Selected = ({data, holder = 'Select', onSelected}: Selecet_Props) => {
  return (
    <View style={{elevation: 5}}>
      <SelectDropdown
        data={data}
        onSelect={(selectedItem, index) => {
          onSelected(selectedItem);
        }}
        renderButton={(selectedItem, isOpened) => {
          return (
            <View style={style.dropdownButtonStyle}>
              <Text style={style.dropdownButtonTxtStyle}>
                {(selectedItem && selectedItem.category) || holder}
              </Text>
              <Image source={require('../../Image/icon/arr.png')} />
            </View>
          );
        }}
        renderItem={(item, index, isSelected) => {
          return (
            <View
              style={{
                ...style.dropdownItemStyle,
                ...(isSelected && {backgroundColor: '#D2D9DF'}),
              }}>
              <Text style={style.dropdownItemTxtStyle}>{item.category}</Text>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        dropdownStyle={style.dropdownMenuStyle}
      />
    </View>
  );
};

const style = StyleSheet.create({
  dropdownButtonStyle: {
    height: DimenHeight(54),
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'rgba(241, 241, 250, 1)',
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: DimenHeight(16),
    fontWeight: '400',
    color: 'rgba(145, 145, 159, 1)',
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
});

export default Selected;
