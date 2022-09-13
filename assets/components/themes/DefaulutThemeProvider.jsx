import { createTheme, CssBaseline, MuiThemeProvider } from "@material-ui/core";
import React from "react";

const theme = createTheme({
  palette: {
    type: "dark",
  },
});

function DefaulutThemeProvider(props) {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {props.children}
    </MuiThemeProvider>
  );
}

export default DefaulutThemeProvider;
