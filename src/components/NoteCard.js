import React from "react";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import "../css/Note.css";
import { Button, Grid, TextField } from "@mui/material";

const NoteCard = (props) => {
  const [editFlag, setEditFlag] = React.useState(false);
  const [editState, setEditState] = React.useState({
    title: props.item.title,
    text: props.item.text,
  });

  return (
    <Grid item xs={6}>
      {!editFlag ? (
        <div className="noteCard">
          <div>
            <strong>Title:</strong> {props.item.title}
          </div>
          <div>
            <strong>Description:</strong> {props.item.text}
          </div>
          <div>
            <strong>Created_at:</strong> {props.item.created_at}
          </div>
          <div>
            <strong>Modified_at:</strong> {props.item.modified_at}
          </div>
          <div className="note__footer">
            <ModeEditIcon
              className="note__edit"
              onClick={() => {
                setEditFlag(true);
                props.setSearchValue("");
              }}
            />
            <DeleteForeverOutlinedIcon
              className="note__delete"
              onClick={() => props.deleteItem(props.item.id)}
            ></DeleteForeverOutlinedIcon>
          </div>
        </div>
      ) : (
        <>
          <div className="editCard">
            <TextField
              placeholder="Title"
              value={editState.title || ""}
              className="titleInput"
              onChange={(e) =>
                setEditState((prev) => ({ ...prev, title: e.target.value }))
              }
              style={{ paddingBottom: "5px" }}
            />
            <TextField
              cols="2"
              rows="2"
              value={editState.text}
              placeholder="Type note here...."
              maxLength="100"
              onChange={(e) =>
                setEditState((prev) => ({ ...prev, text: e.target.value }))
              }
              style={{ paddingBottom: "5px" }}
            ></TextField>
            <div className="note__footer">
              <Button
                onClick={() => setEditFlag(false)}
                variant="outlined"
                color="inherit"
              >
                cancel
              </Button>
              &nbsp;
              <Button
                className="edit_button"
                variant="contained"
                onClick={() => {
                  setEditFlag(false);
                  props.editItem(
                    props.item.id,
                    editState.title,
                    editState.text
                  );
                }}
              >
                Save
              </Button>
            </div>
          </div>
        </>
      )}
    </Grid>
  );
};

export default NoteCard;
