import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import React, {FC, useContext, useState} from 'react';
import {ColorsLegacy} from '../../../components/LegacyColors/LegacyColors';
import CostumeInputCash from '../../../components/LegacyInput/CostumeInputCash';
import Selected from '../../../components/DropDown/Selected';
import Legacy from '../../../components/LegacyButton/Legacy';
import {DimenHeight} from '../../../utils/Dimensions';
import CostumeInput from '../../../components/LegacyInput/CostumeInput';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigatorParamList} from '../../../route/Appstack';
import HandlerWarning from '../../../components/HandleAlert/HandleAlert';
import {ExpenseSelected} from '../../../utils/enums/VariableData';
import {addExpense} from '../../../services/NewDatabase';
import {UseContext} from '../../../context/Context';

const ExpenseScreen: FC<
  NativeStackScreenProps<NavigatorParamList, 'Expense'>
> = ({navigation}) => {
  const {user} = useContext(UseContext);

  const [category, setCategory] = useState('');
  const [expense, setExpense] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [desc, setDesc] = useState('');

  const handleAddExpense = async () => {
    if (category && expense) {
      await addExpense(parseFloat(expense), category, desc, date, user.id);
      setCategory('');
      setExpense('');
      setDate(new Date().toISOString().split('T')[0]);
      HandlerWarning('Success', 'Expense added successfully!', HandleSucces);
    } else {
      HandlerWarning('Fail', 'Please fill all fields');
    }
  };
  const HandleSucces = () => {
    navigation.replace('BottomTabs');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{flex: 1}}>
      <View style={style.container}>
        <View style={style.inputCash}>
          <CostumeInputCash onChanges={(e: string) => setExpense(e)} />
        </View>
        <View style={style.conWhite}>
          <View style={style.conWrap}>
            <View style={style.conAction}>
              <Selected
                data={ExpenseSelected}
                holder="Category"
                onSelected={(e: any) => {
                  setCategory(e.category);
                }}
              />
              <CostumeInput
                values={desc}
                elevations={false}
                onChanges={(e: string) => setDesc(e)}
                placehold="Description"
              />
            </View>
            <View style={{}}>
              <Legacy
                Title="Continue"
                StyleColor={ColorsLegacy.violet100}
                TextColor={ColorsLegacy.white}
                onPressed={handleAddExpense}
              />
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: ColorsLegacy.red100,
    flex: 1,
  },
  inputCash: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 8,
  },
  conWhite: {
    flex: 1,
    backgroundColor: ColorsLegacy.white,
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
  },
  conWrap: {
    padding: 8,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    flex: 1,
  },
  conAction: {
    height: DimenHeight(200),
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
});
export default ExpenseScreen;
