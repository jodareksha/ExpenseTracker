import {
  View,
  Text,
  Image,
  ViewStyle,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React from 'react';
import {DimenHeight, DimenWidth} from '../../utils/Dimensions';
import {ColorsLegacy} from '../LegacyColors/LegacyColors';
import CardYet from './CardYet';

type DataItems = {
  amount?: number;
  expenses?: string;
  Incomes?: string;
  expense?: string;
  income?: string;
  category?: string;
  time?: string;
  desc?: string;
  id?: number;
};
type CardTodayProps = {
  data: DataItems[];
};
const CardToday = ({data}: CardTodayProps) => {
  const shopping = require('../../Image/icon/shopping.png');
  const sub = require('../../Image/icon/bill.png');
  const food = require('../../Image/icon/fork.png');
  const money = require('../../Image/icon/salary.png');
  const car = require('../../Image/icon/car.png');

  const _renderItem = () => {
    return (
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {data?.map((item, index) => {
            const image =
              item.category == 'Shopping'
                ? shopping
                : item.category == 'Subscription'
                ? sub
                : item.category == 'Food'
                ? food
                : item.category == 'Salary' || item.category == 'Passive Income'
                ? money
                : car;
            const onColor =
              item.category == 'Shopping'
                ? 'rgba(252, 238, 212, 1)'
                : item.category == 'Subscription'
                ? 'rgba(238, 229, 255, 1)'
                : item.category == 'Food'
                ? 'rgba(253, 213, 215, 1)'
                : item.category == 'Salary' || item.category == 'Passive Income'
                ? 'rgba(207, 250, 234, 1)'
                : 'rgba(189, 220, 255, 1)';
            return (
              <View key={index} style={style.container}>
                <View style={style.bigContainer}>
                  <View style={style.wraps}>
                    <View style={getDynamicContainerImage(onColor)}>
                      <Image source={image} style={style.imgCon} />
                    </View>
                    <View style={style.textCon}>
                      <Text style={style.textStyle}>{item.category}</Text>
                      <Text style={style.desx}>{item.desc}</Text>
                    </View>
                  </View>
                  <View style={[style.textCon, {alignItems: 'flex-end'}]}>
                    <Text
                      style={[
                        style.textStyle,
                        {
                          color:
                            item.income !== undefined ||
                            item.Incomes !== undefined
                              ? 'rgba(0, 168, 107, 1)'
                              : 'rgba(253, 60, 74, 1)',
                        },
                      ]}>
                      {item.income !== undefined || item.Incomes !== undefined
                        ? `+ $${item.income || item.Incomes}`
                        : `- $${item.expense || item.amount}`}
                    </Text>
                    <Text style={style.desx}>{item.time}</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      {data.length == 0 ? (
        <>
          <CardYet />
        </>
      ) : (
        <>
          <_renderItem />
        </>
      )}
    </View>
  );
};

const getDynamicContainerImage = (x: string): ViewStyle => ({
  backgroundColor: x,
  height: DimenHeight(60),
  width: DimenWidth(60),
  borderRadius: 16,
  alignItems: 'center',
  justifyContent: 'center',
});

const style = StyleSheet.create({
  container: {},
  wraps: {flexDirection: 'row', alignItems: 'center'},
  bigContainer: {
    backgroundColor: 'rgba(252, 252, 252, 1)',
    height: DimenHeight(90),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginVertical: 5,
    elevation: 1,
    shadowColor: ColorsLegacy.black,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  textCon: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: DimenHeight(55),
    padding: 4,
    marginLeft: 8,
  },
  imgCon: {
    resizeMode: 'contain',
    height: DimenHeight(30),
    width: DimenWidth(30),
  },
  textStyle: {
    fontSize: DimenHeight(16),
    fontWeight: '500',
    color: 'black',
  },
  desx: {
    fontSize: DimenHeight(13),
    fontWeight: '500',
    color: 'rgba(145, 145, 159, 1)',
  },
});
export default CardToday;
