import React from "react";
import ReactDOM from "react-dom/client";
import AppSnackbar from "./components/AppSnackbar";
import DefaulutThemeProvider from "./components/themes/DefaulutThemeProvider";
import TodoTable from "./components/TodoTable";
import TodoContextProvider from "./context/TodoContext";

function App() {
  return (
    <TodoContextProvider>
      <TodoTable />
      <AppSnackbar />
    </TodoContextProvider>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <DefaulutThemeProvider>
    <App />
  </DefaulutThemeProvider>
);
