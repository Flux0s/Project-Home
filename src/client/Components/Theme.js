import cyan from "@material-ui/core/colors/cyan";
import blueGrey from "@material-ui/core/colors/blueGrey";
import red from "@material-ui/core/colors/red";

// All the following keys are optional.
// We try our best to provide a great default value.
const theme = {
  palette: {
    primary: { main: cyan.A400 },
    secondary: { main: blueGrey[700] },
    error: red,
    // Used by `getContrastText()` to maximize the contrast between the background and
    // the text.
    contrastThreshold: 3,
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2
  }
};

export default theme;
