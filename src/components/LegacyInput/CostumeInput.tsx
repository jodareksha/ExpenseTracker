import {
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {DimenHeight, DimenWidth} from '../../utils/Dimensions';
import {ColorsLegacy} from '../LegacyColors/LegacyColors';

type PropsInput = {
  placehold: string;
  onChanges: any;
  Password?: boolean;
  elevations?: boolean;
  values?: any;
};

const CostumeInput = ({
  placehold,
  onChanges,
  Password = false,
  elevations = true,
  values,
}: PropsInput) => {
  const [pass, setPass] = useState<boolean>(true);

  return (
    <View style={elevations ? style.container : style.container2}>
      {!Password ? (
        <TextInput
          value={values}
          placeholder={placehold}
          placeholderTextColor={ColorsLegacy.gray}
          style={{
            color: ColorsLegacy.black,
            fontSize: DimenHeight(16),
          }}
          onChangeText={e => {
            onChanges(e);
          }}
        />
      ) : (
        <View style={style.conPass}>
          <TextInput
            value={values}
            placeholder={placehold}
            placeholderTextColor={ColorsLegacy.gray}
            secureTextEntry={pass}
            style={{
              width: '80%',
              color: ColorsLegacy.black,
              fontSize: DimenHeight(16),
            }}
            onChangeText={e => {
              onChanges(e);
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setPass(!pass);
            }}>
            <Image
              source={require('../../Image/icon/show.png')}
              style={style.Eyes}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: DimenHeight(56),
    justifyContent: 'center',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    shadowColor: ColorsLegacy.black,
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  container2: {
    backgroundColor: 'white',
    height: DimenHeight(56),
    justifyContent: 'center',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgba(241, 241, 250, 1)',
  },
  conPass: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Eyes: {
    height: DimenHeight(32),
    width: DimenWidth(32),
    resizeMode: 'contain',
  },
});

export default CostumeInput;
