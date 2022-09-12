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

function TodoTable() {
  const context = useContext(TodoContext);
  const [addTodo, setAddTodo] = useState("");
  const [editTodo, setEditTodo] = useState("");
  const [editTableShown, setEditTableShown] = useState(false);
  const [deleteConfirmationIsShown, setDeleteConfirmationIsShown] =
    useState(false);
  const [todoToBeDeleted, setTodoToBeDeleted] = useState(null);

  const onCreateSubmit = (event) => {
    event.preventDefault();
    context.createTodo(event, { name: addTodo });
    setAddTodo("");
  };

  const onEditSubmit = (todoId, event) => {
    event.preventDefault();
    context.updateTodo({ id: todoId, name: editTodo });
    setEditTableShown(false);
  };

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Task</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow>
            <TableCell>
              <form onSubmit={onCreateSubmit}>
                <TextField
                  type="text"
                  value={addTodo}
                  onChange={(event) => {
                    setAddTodo(event.target.value);
                  }}
                  label="New Task"
                  fullWidth={true}
                />
              </form>
            </TableCell>
            <TableCell align="right">
              <IconButton onClick={onCreateSubmit}>
                <AddIcon style={{ color: "green" }} />
              </IconButton>
            </TableCell>
          </TableRow>

          {context.todos
            .slice()
            .reverse()
            .map((todo, index) => (
              <TableRow key={"todo " + index}>
                <TableCell>
                  {editTableShown === todo.id ? (
                    <form onSubmit={onEditSubmit.bind(this, todo.id)}>
                      <TextField
                        type="text"
                        autoFocus={true}
                        fullWidth={true}
                        value={editTodo}
                        onChange={(event) => {
                          setEditTodo(event.target.value);
                        }}
                        InputProps={{
                          endAdornment: (
                            <>
                              <IconButton
                                onClick={() => {
                                  setEditTableShown(false);
                                }}
                              >
                                <CheckCircleOutlineIcon />
                              </IconButton>
                              <IconButton>
                                <HighlightOffIcon
                                  style={{ color: "red" }}
                                ></HighlightOffIcon>
                              </IconButton>
                            </>
                          ),
                        }}
                      />
                    </form>
                  ) : (
                    todo.name
                  )}
                </TableCell>

                <TableCell align="right">
                  <IconButton
                    onClick={() => {
                      setEditTableShown(todo.id);
                      setEditTodo(todo.name);
                    }}
                  >
                    <EditIcon style={{ color: "blue" }} />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      setDeleteConfirmationIsShown(true);
                      setTodoToBeDeleted(todo);
                    }}
                  >
                    <DeleteIcon style={{ color: "red" }} />
                  </IconButton>
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
