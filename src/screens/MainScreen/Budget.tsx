import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import {ColorsLegacy} from '../../components/LegacyColors/LegacyColors';
import Legacy from '../../components/LegacyButton/Legacy';
import CardToday from '../../components/Card/CardToday';
import {DimenHeight, DimenWidth} from '../../utils/Dimensions';
import {months} from '../../utils/enums/VariableData';

const Budget = () => {
  const currentMonthIndex = new Date().getMonth();
  const [monthIndex, setMonthIndex] = useState(currentMonthIndex);

  const handlePreviousMonth = () => {
    setMonthIndex(prevIndex => (prevIndex === 0 ? 11 : prevIndex - 1));
  };

  const handleNextMonth = () => {
    setMonthIndex(prevIndex => (prevIndex === 11 ? 0 : prevIndex + 1));
  };

  return (
    <SafeAreaView style={style.container}>
      {/* Header */}
      <View style={style.bigCon}>
        <View style={style.head}>
          <TouchableOpacity onPress={handlePreviousMonth}>
            <Text style={style.navButton}>‹</Text>
          </TouchableOpacity>
          <Text style={style.monthText}>{months[monthIndex]}</Text>
          <TouchableOpacity onPress={handleNextMonth}>
            <Text style={style.navButton}>›</Text>
          </TouchableOpacity>
        </View>
        {/* Empty State */}
        <View style={style.wrap}>
          {/* Create a Budget Button */}
          <CardToday data={[]} />
          <Legacy
            Title="Create a Budget"
            StyleColor={ColorsLegacy.violet100}
            TextColor={ColorsLegacy.violet20}
            onPressed={() => {}}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorsLegacy.violet100,
    justifyContent: 'space-between',
  },
  bigCon: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
  },
  wrap: {
    flex: 1,
    backgroundColor: ColorsLegacy.white,
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
    padding: DimenHeight(10),
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: DimenWidth(20),
    height: '15%',
  },
  navButton: {
    color: 'white',
    fontSize: DimenHeight(24),
  },
  monthText: {
    color: 'white',
    fontSize: DimenHeight(18),
    fontWeight: 'bold',
  },
});

export default Budget;
