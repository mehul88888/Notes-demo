import { React, useState } from "react";

import "../css/Note.css";
import {
  Box,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import AddNote from "./AddNote";
import NoteCard from "./NoteCard";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const [key, setKey] = useState("title");
  const [order, setOrder] = useState("ascending");

  const deleteItem = (id) => {
    const filteredNotes = notes.filter((note) => note.id !== id);
    setNotes(filteredNotes);
  };
  const editItem = (id, editTitle, editText) => {
    const editedNotes = notes.map((note) => {
      if (note.id === id) {
        return {
          ...note,
          id: note.id,
          title: editTitle,
          text: editText,
          modified_at: new Date().toISOString(),
        };
      } else {
        return note;
      }
    });
    setNotes(editedNotes);
  };
  const searchHandler = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="notes">
      <AddNote setNotes={setNotes} />
      <div className="searchBox">
        <TextField
          placeholder="Search..."
          variant="outlined"
          value={searchValue || ""}
          onChange={searchHandler}
          fullWidth
        />
      </div>
      <Box display="flex" justifyContent="center">
        <FormControl fullWidth>
          <Select
            value={key || ""}
            onChange={(e) => {
              setKey(e.target.value);
            }}
            name="key"
            placeholder="select"
            size="small"
          >
            <MenuItem value="title">Title</MenuItem>
            <MenuItem value="created_at">created_at</MenuItem>
            <MenuItem value="modified_at">modified_at</MenuItem>
          </Select>
        </FormControl>
        &nbsp;
        <FormControl fullWidth>
          <Select
            value={order || ""}
            onChange={(e) => {
              setOrder(e.target.value);
            }}
            name="order"
            placeholder="select"
            size="small"
          >
            <MenuItem value="ascending">ascending</MenuItem>
            <MenuItem value="descending">descending</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Grid container className="notes__List1" spacing={2}>
        {notes
          ?.filter((singleItem) =>
            !!searchValue
              ? singleItem.title.includes(searchValue) ||
                singleItem.text.includes(searchValue)
              : true
          )
          ?.sort(function (a, b) {
            console.log(a[key], "a[key]");
            let aVal = key === "title" ? a[key] : new Date(a[key]);
            let bVal = key === "title" ? b[key] : new Date(b[key]);
            if ("ascending" === order) {
              return aVal < bVal ? 1 : -1;
            }
            if ("descending" === order) {
              return aVal > bVal ? 1 : -1;
            }
          })
          ?.map((item) => {
            return (
              <NoteCard
                item={item}
                setSearchValue={setSearchValue}
                key={item.id}
                deleteItem={deleteItem}
                editItem={editItem}
              />
            );
          })}
      </Grid>
    </div>
  );
}
export default Notes;
