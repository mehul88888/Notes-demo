import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { v4 as uuid } from "uuid";

const AddNote = ({ setNotes }) => {
  const [title, setTitle] = useState("");
  const [inputText, setInputText] = useState("");
  const titleHandler = (e) => {
    setTitle(e.target.value);
  };
  const textHandler = (e) => {
    setInputText(e.target.value);
  };

  const saveNotesHandler = () => {
    if (inputText === "" || title === "") {
      return;
    }
    setNotes((prevState) => [
      ...prevState,
      {
        id: uuid(),
        title: title,
        text: inputText,
        created_at: new Date().toISOString(),
        modified_at: new Date().toISOString(),
      },
    ]);
    //clear the textarea
    setTitle("");
    setInputText("");
  };
  return (
    <div className="addcontainer">
      <div className="textContainer">
        <TextField
          variant="outlined"
          onChange={titleHandler}
          value={title}
          fullWidth
          placeholder="Title"
          size="small"
        />
      </div>
      <div className="textContainer">
        <TextField
          variant="outlined"
          onChange={textHandler}
          value={inputText}
          size="small"
          fullWidth
          placeholder="Type description here..."
        />
      </div>
      <div className="note__footer">
        <Button
          variant="contained"
          className="note__save"
          onClick={saveNotesHandler}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default AddNote;
