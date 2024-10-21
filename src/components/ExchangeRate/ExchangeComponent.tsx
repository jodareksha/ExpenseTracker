import React, {FC} from 'react';
import {currencyIcons} from './ExchangeIcon';
interface IconComponentProps {
  code: string;
  style?: object;
}
const ExchangeComponent: FC<IconComponentProps> = ({code, style}) => {
  const Component = currencyIcons[code];
  return <Component style={style} />;
};

export default ExchangeComponent;
