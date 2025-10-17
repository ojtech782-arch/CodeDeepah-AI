import { DefaultTheme } from 'styled-components/native';
import colors from './colors';

const theme: DefaultTheme = {
  colors: {
    primary: colors.blue,
    secondary: colors.lightBlue,
    background: colors.white,
    text: colors.darkBlue,
    border: colors.gray,
    notification: colors.red,
  },
  fonts: {
    regular: 'Roboto-Regular',
    medium: 'Roboto-Medium',
    bold: 'Roboto-Bold',
  },
  spacing: {
    small: 8,
    medium: 16,
    large: 24,
  },
  borderRadius: {
    small: 4,
    medium: 8,
    large: 16,
  },
  shadows: {
    small: {
      shadowColor: colors.black,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.5,
      elevation: 2,
    },
    medium: {
      shadowColor: colors.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.3,
      shadowRadius: 3.5,
      elevation: 5,
    },
    large: {
      shadowColor: colors.black,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.4,
      shadowRadius: 5,
      elevation: 10,
    },
  },
};

export default theme;