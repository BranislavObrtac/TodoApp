import React from "react";
import ReactDOM from "react-dom/client";
import TodoTable from "./components/TodoTable";
import TodoContextProvider from "./context/TodoContext";

function App() {
  return (
    <TodoContextProvider>
      <TodoTable />
    </TodoContextProvider>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
