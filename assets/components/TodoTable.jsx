import {
  Button,
  IconButton,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import DeleteDialog from "./DeleteDialog";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

function TodoTable() {
  const context = useContext(TodoContext);
  const [addTodoName, setAddTodoName] = useState("");
  const [addTodoDescription, setAddTodoDescription] = useState("");
  const [editTodoName, setEditTodoName] = useState("");
  const [editTodoDescription, setEditTodoDescription] = useState("");
  const [editTableShown, setEditTableShown] = useState(false);
  const [deleteConfirmationIsShown, setDeleteConfirmationIsShown] =
    useState(false);
  const [todoToBeDeleted, setTodoToBeDeleted] = useState(null);

  const onCreateSubmit = (event) => {
    event.preventDefault();
    context.createTodo(event, {
      name: addTodoName,
      description: addTodoDescription,
    });
    setAddTodoName("");
    setAddTodoDescription("");
  };

  const onEditSubmit = (todoId, event) => {
    event.preventDefault();
    context.updateTodo({
      id: todoId,
      name: editTodoName,
      description: editTodoDescription,
    });
    setEditTableShown(false);
  };

  return (
    <>
      <Table>
        {/* HEAD */}
        <TableHead>
          <TableRow>
            <TableCell>Task</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>

        {/* BODY */}
        <TableBody>
          {/* ADD ROW*/}
          <TableRow>
            {/* NAME CELL */}
            <TableCell>
              <form onSubmit={onCreateSubmit}>
                <TextField
                  type="text"
                  value={addTodoName}
                  onChange={(event) => {
                    setAddTodoName(event.target.value);
                  }}
                  label="New Task"
                  fullWidth={true}
                />
              </form>
            </TableCell>

            {/* DESCRIPTION CELL */}
            <TableCell>
              <form>
                <TextField
                  type="text"
                  value={addTodoDescription}
                  onChange={(event) => {
                    setAddTodoDescription(event.target.value);
                  }}
                  label="Description"
                  fullWidth={true}
                  multiline={true}
                />
              </form>
            </TableCell>

            {/* ACTION ICON CELL */}
            <TableCell align="right">
              <IconButton onClick={onCreateSubmit}>
                <AddIcon style={{ color: "green" }} />
              </IconButton>
            </TableCell>
          </TableRow>

          {/* DATA */}
          {context.todos
            .slice()
            .reverse()
            .map((todo, index) => (
              <TableRow key={"todo " + index}>
                {/* DATA NAME */}
                <TableCell>
                  {editTableShown === todo.id ? (
                    <form onSubmit={onEditSubmit.bind(this, todo.id)}>
                      <TextField
                        type="text"
                        autoFocus={true}
                        fullWidth={true}
                        value={editTodoName}
                        onChange={(event) => {
                          setEditTodoName(event.target.value);
                        }}
                      />
                    </form>
                  ) : (
                    <Typography>{todo.name}</Typography>
                  )}
                </TableCell>

                {/* DATA DESCRIPTION */}
                <TableCell>
                  {editTableShown === todo.id ? (
                    <TextField
                      type="text"
                      fullWidth={true}
                      value={editTodoDescription}
                      multiline={true}
                      onChange={(event) => {
                        setEditTodoDescription(event.target.value);
                      }}
                    />
                  ) : (
                    <Typography style={{ whiteSpace: "pre-wrap" }}>
                      {todo.description}
                    </Typography>
                  )}
                </TableCell>

                {/* DATA ACTION BUTTONS */}

                <TableCell align="right">
                  {editTableShown === todo.id ? (
                    <>
                      <IconButton onClick={onEditSubmit.bind(this, todo.id)}>
                        <DoneIcon />
                      </IconButton>

                      <IconButton onClick={() => setEditTableShown(false)}>
                        <CloseIcon />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <IconButton
                        onClick={() => {
                          setEditTableShown(todo.id);
                          setEditTodoName(todo.name);
                          setEditTodoDescription(todo.description);
                        }}
                      >
                        <EditIcon />
                      </IconButton>

                      <IconButton
                        onClick={() => {
                          setDeleteConfirmationIsShown(true);
                          setTodoToBeDeleted(todo);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {deleteConfirmationIsShown && (
        <DeleteDialog
          todo={todoToBeDeleted}
          open={deleteConfirmationIsShown}
          setDeleteConfirmationIsShown={setDeleteConfirmationIsShown}
        ></DeleteDialog>
      )}
    </>
  );
}

export default TodoTable;
