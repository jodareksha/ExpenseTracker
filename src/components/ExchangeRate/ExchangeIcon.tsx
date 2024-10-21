import {FC} from 'react';
import {SvgProps} from 'react-native-svg';
import SGDIcon from './icons/Flag_of_Singapore.svg';
import IDRIcon from './icons/Flag_of_Indonesia.svg';

export type CurrencyIcons = {
  [key: string]: FC<SvgProps>;
};

export const currencyIcons: CurrencyIcons = {
  SGD: SGDIcon,
  IDR: IDRIcon,
};
