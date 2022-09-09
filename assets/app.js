import { CssBaseline } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import AppSnackbar from "./components/AppSnackbar";
import TodoTable from "./components/TodoTable";
import TodoContextProvider from "./context/TodoContext";

function App() {
  return (
    <TodoContextProvider>
      <CssBaseline>
        <TodoTable />
        <AppSnackbar />
      </CssBaseline>
    </TodoContextProvider>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
