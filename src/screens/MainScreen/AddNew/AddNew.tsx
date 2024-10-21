import {View, KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import React, {FC, useContext, useEffect, useState} from 'react';
import CostumeInputCash from '../../../components/LegacyInput/CostumeInputCash';
import {ColorsLegacy} from '../../../components/LegacyColors/LegacyColors';
import Legacy from '../../../components/LegacyButton/Legacy';
import CostumeInput from '../../../components/LegacyInput/CostumeInput';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigatorParamList} from '../../../route/Appstack';
import Selected from '../../../components/DropDown/Selected';
import {incomeExpense, IncomeSelected} from '../../../utils/enums/VariableData';
// import {addIncome} from '../../../services/databaseIncome';
import HandlerWarning from '../../../components/HandleAlert/HandleAlert';
import {addIncome} from '../../../services/NewDatabase';
import {UseContext} from '../../../context/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddNew: FC<NativeStackScreenProps<NavigatorParamList, 'NewUser'>> = ({
  navigation,
}) => {
  const [category, setCategory] = useState('');
  const [income, setIncome] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [Name, setName] = useState('');
  const [user, setUser] = useState<any>();

  const get = async () => {
    const users = await AsyncStorage.getItem('user');
    const parse = JSON.parse(users);
    setUser(parse.id);
    console.log(parse.id, 'ini');
  };
  useEffect(() => {
    get();
  }, []);

  const handleAdd = async () => {
    if (category && income) {
      await addIncome(parseFloat(income), Name, category, date, user);
      setCategory('');
      setIncome('');
      setDate(new Date().toISOString().split('T')[0]);
      HandlerWarning('Success', 'Income added successfully!', HandleSucces);
    } else {
      HandlerWarning('Fail', 'Please fill all fields');
    }
  };
  console.log(user);
  const HandleSucces = () => {
    navigation.replace('BottomTabs');
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{flex: 1}}>
      <View style={style.container}>
        <View style={style.inputCash}>
          <CostumeInputCash
            onChanges={(e: string) => {
              setIncome(e);
            }}
            label="Balance"
          />
        </View>
        <View style={style.conWhite}>
          <View style={style.conWrap}>
            <View style={style.conAction}>
              <CostumeInput
                values={Name}
                elevations={false}
                onChanges={(e: string) => {
                  setName(e);
                }}
                placehold="Name"
              />
            </View>
            <Selected
              data={IncomeSelected}
              holder="Type Income"
              onSelected={(e: any) => {
                setCategory(e.category);
              }}
            />
            <View style={{marginVertical: 30}}>
              <Legacy
                Title="Continue"
                StyleColor={ColorsLegacy.violet100}
                TextColor={ColorsLegacy.white}
                onPressed={handleAdd}
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
    backgroundColor: ColorsLegacy.violet100,
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
    justifyContent: 'center',
  },
  conWrap: {
    padding: 8,
    flex: 1,
    flexDirection: 'column',
  },
  conAction: {
    justifyContent: 'center',
    marginVertical: 30,
  },
});

export default AddNew;
