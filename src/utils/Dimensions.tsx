import {Dimensions, Platform} from 'react-native';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

let widthFigma = 375;
let heightFigma = 812;

export const DimenWidth = (width: number) => {
  return (windowWidth * width) / widthFigma;
};

export const DimenHeight = (height: number) => {
  return (windowHeight * height) / heightFigma;
};

export const DimenHeightOnlyIos = (height: number) => {
  if (Platform.OS !== 'ios') return height;
  return (windowHeight * height) / heightFigma;
};

export const DimenWidthOnlyIos = (width: number) => {
  if (Platform.OS !== 'ios') return width;
  return (windowWidth * width) / widthFigma;
};
