import { createMuiTheme } from '@material-ui/core/styles';
import {
  blueGrey,
  deepOrange,
  green
} from '@material-ui/core/colors'

export const theme = {
  palette: {
    primary: green,
    secondary: blueGrey,
    error: deepOrange
  }
};

const Theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: blueGrey,
    error: deepOrange
  }
});

export default Theme;