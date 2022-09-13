import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./components/Router";
import DefaulutThemeProvider from "./components/themes/DefaulutThemeProvider";

function App() {
  return <Router />;
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <DefaulutThemeProvider>
    <App />
  </DefaulutThemeProvider>
);
