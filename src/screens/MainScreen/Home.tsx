import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ScrollView,
  BackHandler,
  Alert,
  Image,
} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {ColorsLegacy} from '../../components/LegacyColors/LegacyColors';
import {DimenHeight, DimenWidth} from '../../utils/Dimensions';
import CurvedChart from '../../components/curvedChart/CurvedChart';
import CardToday from '../../components/Card/CardToday';
import {
  getCategoryBreakdown,
  getExpenses,
  getExpensesLast7Days,
  getTotalSpending,
} from '../../services/database';
import {useFocusEffect} from '@react-navigation/native';
import {getIncomes, getTotalIncome} from '../../services/databaseIncome';
import {UseContext} from '../../context/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface ExpenseState {
  id: number;
  amount: number;
  category: string;
  desc: string;
  time: string;
}

const warnBackAction = () => {
  Alert.alert('Hold On!', 'Are you sure you want to go back?', [
    {
      text: 'Cancel',
      onPress: () => null,
      style: 'cancel',
    },
    {text: 'YES', onPress: () => BackHandler.exitApp()},
  ]);
  return true;
};
const Home = () => {
  const expensesContext = useContext(UseContext);

  if (!expensesContext) {
    return <Text>Loading...</Text>;
  }

  const {categoryBreakdown, expenses, spend, income, fetchExpenses} =
    expensesContext;

  const lineData = categoryBreakdown.map(item => ({
    value: Number(item.percentage),
    dataPointText: item.category,
  }));

  useEffect(() => {
    fetchExpenses();
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      warnBackAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView style={style.container}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <ScrollView style={style.conWrap} showsVerticalScrollIndicator={false}>
        <View style={style.conYolk}>
          <View style={style.contextStyle}>
            <Text style={style.acc}>Account Balance</Text>
          </View>
          <View style={style.contextStyle}>
            <Text style={style.dollar}>${income - spend}</Text>
          </View>
          <View style={style.conImageRow}>
            <View style={style.conIncome}>
              <View style={style.conWhite}>
                <Image source={require('../../Image/icon/Income.png')} />
              </View>
              <View>
                <Text style={style.inx}>Income</Text>
                <Text style={style.Moneys}>${income}</Text>
              </View>
            </View>
            <View style={style.conXncome}>
              <View style={style.conWhite}>
                <Image source={require('../../Image/icon/Expense.png')} />
              </View>
              <View>
                <Text style={style.inx}>Expenses</Text>
                <Text style={style.Moneys}>${spend}</Text>
              </View>
            </View>
          </View>
        </View>
        <View>
          <View style={style.conLabels}>
            <Text style={style.Labels}>Spend Frequency</Text>
          </View>
          <View style={{}}>
            <CurvedChart data={lineData} />
          </View>
        </View>
        <View style={style.conLabels}>
          <Text style={style.Labels}>Recent Transaction</Text>
        </View>
        <View style={{padding: 8}}>
          <CardToday data={expenses} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorsLegacy.white,
  },
  conWrap: {
    flex: 1,
  },
  acc: {
    color: 'rgba(145, 145, 159, 1)',
    fontSize: DimenHeight(14),
    fontWeight: '500',
  },
  dollar: {
    fontSize: DimenHeight(40),
    fontWeight: '600',
    color: 'black',
  },
  contextStyle: {alignItems: 'center'},
  conYolk: {
    backgroundColor: '#FFF6E5',
    height: DimenHeight(312),
    borderBottomRightRadius: 32,
    borderBottomLeftRadius: 32,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  conImageRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  conIncome: {
    backgroundColor: ColorsLegacy.green,
    height: DimenHeight(80),
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
    borderRadius: 30,
  },
  conXncome: {
    backgroundColor: ColorsLegacy.red100,
    height: DimenHeight(80),
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
    borderRadius: 30,
  },
  conWhite: {
    backgroundColor: ColorsLegacy.white,
    height: DimenHeight(48),
    width: DimenWidth(48),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginHorizontal: 10,
  },
  inx: {
    fontWeight: '500',
    color: 'white',
    fontSize: DimenHeight(14),
  },
  Moneys: {
    marginTop: 5,
    fontSize: DimenHeight(18),
    color: 'white',
    fontWeight: '600',
    marginRight: 10,
  },
  Labels: {
    fontSize: DimenHeight(18),
    color: 'black',
    fontWeight: '600',
  },
  conLabels: {padding: 8, marginVertical: 8, marginHorizontal: 8},
});

export default Home;
