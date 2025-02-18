import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------
// export const tokensDark = {
//   grey: {
//     0: "#ffffff", // manually adjusted
//     10: "#f6f6f6", // manually adjusted
//     50: "#f0f0f0", // manually adjusted
//     100: "#e0e0e0",
//     200: "#c2c2c2", 
//     300: "#a3a3a3",
//     400: "#858585",
//     500: "#666666",
//     600: "#525252",
//     700: "#3d3d3d",
//     800: "#292929",
//     900: "#141414",
//     1000: "#000000", // manually adjusted
//   },
//   primary: {
//     // blue
//     100: "#d3d4de",
//     200: "#a6a9be",
//     300: "#7a7f9d",
//     400: "#4d547d",
//     500: "#21295c",
//     600: "#191F45", // manually adjusted
//     700: "#141937",
//     800: "#0d1025",
//     900: "#070812",
//   },
//   secondary: {
//     // yellow
//     50: "#f0f0f0", // manually adjusted
//     100: "#fff6e0",
//     200: "#ffedc2",
//     300: "#ffe3a3",
//     400: "#ffda85",
//     500: "#ffd166",
//     600: "#cca752",
//     700: "#997d3d",
//     800: "#665429",
//     900: "#332a14",
//   },
// };
// SETUP COLORS
const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
};

const PRIMARY = {
  lighter: '#D1E9FC',
  light: '#76B0F1',
  main: '#2065D1',
  dark: '#103996',
  darker: '#061B64',
  contrastText: '#fff',
  500: "#59C15C",

};
const GREEN = {
  0: '#4CAF50',
  100: '#E8F5E9',
  200: '#C8E6C9',
  300: '#A5D6A7',
  350: '#81C784',
  400: '#66BB6A',
  500: '#4CAF50',
  600: '#43A047',
  700: '#388E3C',
  800: '#2E7D32',
  900: '#1B5E20',
}

const SECONDARY = {
  lighter: '#D6E4FF',
  light: '#84A9FF',
  main: '#3366FF',
  dark: '#1939B7',
  darker: '#091A7A',
  contrastText: '#fff',
};

const INFO = {
  lighter: '#D0F2FF',
  light: '#74CAFF',
  main: '#1890FF',
  dark: '#0C53B7',
  darker: '#04297A',
  contrastText: '#fff',
};

const SUCCESS = {
  lighter: '#E9FCD4',
  light: '#AAF27F',
  main: '#54D62C',
  dark: '#229A16',
  darker: '#08660D',
  contrastText: GREY[800],
};

const WARNING = {
  lighter: '#FFF7CD',
  light: '#FFE16A',
  main: '#FFC107',
  dark: '#B78103',
  darker: '#7A4F01',
  contrastText: GREY[800],
};

const ERROR = {
  lighter: '#FFE7D9',
  light: '#FFA48D',
  main: '#FF4842',
  dark: '#B72136',
  darker: '#7A0C2E',
  contrastText: '#fff',
};

const palette = {
  common: { black: '#000', white: '#fff' },
  primary: PRIMARY,
  secondary: SECONDARY,
  info: INFO,
  success: SUCCESS,
  warning: WARNING,
  error: ERROR,
  grey: GREY,
  divider: alpha(GREY[500], 0.24),
  text: {
    primary: GREY[800],
    secondary: GREY[600],
    disabled: GREY[500],
  },
  background: {
    paper: '#fff',
    default: GREY[100],
    neutral: GREY[200],
    // boxdefault: tokensDark.primary[600],
    alt: GREEN[100],
  },
  action: {
    active: GREY[600],
    hover: alpha(GREY[500], 0.08),
    selected: alpha(GREY[500], 0.16),
    disabled: alpha(GREY[500], 0.8),
    disabledBackground: alpha(GREY[500], 0.24),
    focus: alpha(GREY[500], 0.24),
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

export default palette;
