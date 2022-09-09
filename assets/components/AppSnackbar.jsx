import { Button, Snackbar, SnackbarContent } from "@mui/material";
import React, { Fragment, useContext } from "react";
import { TodoContext } from "../context/TodoContext";

function checkLevel(level) {
  switch (level) {
    case "success":
      return "green";

    case "error":
      return "red";

    default:
      return "white";
  }
}

function AppSnackbar() {
  const context = useContext(TodoContext);

  return (
    <Snackbar autoHideDuration={5000} open={context.message.text !== undefined}>
      {context.message.text && (
        <SnackbarContent
          style={{ backgroundColor: checkLevel(context.message.level) }}
          message={context.message.text.map((text, index) => (
            <Fragment key={index + " " + text}>
              <span>{text}</span>
              <br></br>
            </Fragment>
          ))}
          action={[
            <Button
              color="inherit"
              onClick={() => {
                context.setMessage({});
              }}
              key="dismiss"
            >
              Dismiss
            </Button>,
          ]}
        />
      )}
    </Snackbar>
  );
}

export default AppSnackbar;
