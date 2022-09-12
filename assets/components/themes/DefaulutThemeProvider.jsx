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

/* import React from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

function DefaulutThemeProvider(props) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  );
}

export default DefaulutThemeProvider; */
