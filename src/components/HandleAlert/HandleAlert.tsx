import {Alert} from 'react-native';

const HandlerWarning = (label: string, msg: string, onPressed?: () => void) => {
  Alert.alert(`${label}`, `${msg}`, [
    {
      text: 'Cancel',
      onPress: () => null,
      style: 'cancel',
    },
    {text: 'YES', onPress: onPressed},
  ]);
  return true;
};

export default HandlerWarning;
