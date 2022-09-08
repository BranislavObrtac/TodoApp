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

  return (
    <>
      <form
        onSubmit={(event) => {
          context.createTodo(event, { name: addTodo });
        }}
      >
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
                <TextField
                  value={addTodo}
                  onChange={(event) => {
                    setAddTodo(event.target.value);
                  }}
                  label="New Task"
                  fullWidth={true}
                />
              </TableCell>
              <TableCell align="right">
                <IconButton type="submit">
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
                      <TextField
                        fullWidth={true}
                        value={editTodo}
                        onChange={(event) => {
                          setEditTodo(event.target.value);
                        }}
                        InputProps={{
                          endAdornment: (
                            <>
                              <IconButton
                                onClick={(event) => {
                                  context.updateTodo({
                                    id: todo.id,
                                    name: editTodo,
                                  }),
                                    setEditTableShown(false);
                                }}
                              >
                                <CheckCircleOutlineIcon
                                  style={{ color: "green" }}
                                ></CheckCircleOutlineIcon>
                              </IconButton>
                              <IconButton
                                onClick={() => setEditTableShown(false)}
                              >
                                <HighlightOffIcon
                                  style={{ color: "red" }}
                                ></HighlightOffIcon>
                              </IconButton>
                            </>
                          ),
                        }}
                      />
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
      </form>

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
