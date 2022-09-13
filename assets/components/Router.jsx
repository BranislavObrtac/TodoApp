import React from "react";
import AppSnackbar from "./AppSnackbar";
import TodoTable from "./TodoTable";
import Navigation from "./Navigation";
import TodoContextProvider from "../context/TodoContext";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  divider: theme.mixins.toolbar,
}));

function Router() {
  const classes = useStyles();
  return (
    <>
      <Navigation className={classes.divider} />
      <div className={classes.divider}></div>
      <TodoContextProvider>
        <TodoTable />
        <AppSnackbar />
      </TodoContextProvider>
    </>
  );
}

export default Router;
