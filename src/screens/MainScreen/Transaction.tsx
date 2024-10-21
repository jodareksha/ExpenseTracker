import {View, Text, SafeAreaView, StyleSheet, Pressable} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import CardToday from '../../components/Card/CardToday';
import Swipper from '../../components/Swipper/Swipper';
import {ColorsLegacy} from '../../components/LegacyColors/LegacyColors';
import {TabNavParamList} from '../../route/BottomTabs/BottomTab';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {weekToMonth} from '../../utils/enums/VariableData';
import {UseContext} from '../../context/Context';
type TransacProps = {};

const Transaction: React.FC<
  NativeStackScreenProps<TabNavParamList, 'Transaction'>
> = ({navigation}) => {
  const expensesContext = useContext(UseContext);

  const {categoryBreakdown, change, setChange, fetchExpenses} = expensesContext;

  useEffect(() => {
    fetchExpenses();
  }, [change]);

  return (
    <SafeAreaView style={style.container}>
      <View style={style.bigContainer}>
        <Pressable
          style={style.reportStyle}
          onPress={() => {
            navigation.navigate('Report');
          }}>
          <Text style={style.labelFinance}>See your financial report</Text>
          <Text style={style.seeAll}>See All</Text>
        </Pressable>
        <View style={style.sweep}>
          <Swipper
            data={weekToMonth}
            onPressed={e => {
              setChange(e);
            }}
          />
        </View>
        <CardToday data={categoryBreakdown} />
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorsLegacy.white,
  },
  bigContainer: {
    flex: 1,
    padding: 10,
  },
  reportStyle: {
    backgroundColor: 'rgba(238, 229, 255, 1)',
    borderColor: 'rgba(127, 61, 255, 1)',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    borderRadius: 10,
  },
  labelFinance: {color: 'rgba(127, 61, 255, 1)'},
  seeAll: {
    textDecorationLine: 'underline',
    color: 'rgba(127, 61, 255, 1)',
  },
  sweep: {
    padding: 10,
  },
});

export default Transaction;
