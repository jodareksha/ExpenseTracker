import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import Swipper from '../../../components/Swipper/Swipper';
import PieChartComponent from '../../../components/PieChart/PieChartComponent';
import Progress from '../../../components/PieChart/Progress';

import {ColorsLegacy} from '../../../components/LegacyColors/LegacyColors';
import {weekToMonth} from '../../../utils/enums/VariableData';
import {useFocusEffect} from '@react-navigation/native';
import {getCategoryBreakdown2} from '../../../services/NewDatabase';
import {UseContext} from '../../../context/Context';

const FinanceReport = () => {
  const expensesContext = useContext(UseContext);

  const {
    categoryBreakdown2,
    change,
    setChange,
    fetchExpenses,
    user,
    fetchAdminScreen,
  } = expensesContext;

  useEffect(() => {
    handles();
  }, [change]);

  const handles = () => {
    if (user?.role == 'admin') {
      fetchAdminScreen();
    } else {
      fetchExpenses();
    }
  };
  return (
    <View style={style.container}>
      {user.role == 'user' ? (
        <View style={style.conSwipe}>
          <Swipper
            data={weekToMonth}
            onPressed={e => {
              setChange(e);
            }}
          />
        </View>
      ) : (
        <></>
      )}
      <View style={style.conPie}>
        <PieChartComponent data={categoryBreakdown2} />
      </View>

      <View style={style.conLabels}>
        <Text style={style.Labels}>Category</Text>
      </View>
      <ScrollView
        style={{flex: 1, padding: 10}}
        showsVerticalScrollIndicator={false}>
        <Progress data={categoryBreakdown2} />
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorsLegacy.white,
  },
  conPie: {
    marginVertical: 10,
  },
  conSwipe: {
    padding: 10,
  },
  conLabels: {padding: 8, marginVertical: 8, marginHorizontal: 8},
  Labels: {
    fontSize: 14,
    color: 'black',
    fontWeight: '600',
  },
});
export default FinanceReport;
