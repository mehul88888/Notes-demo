import { Button, TextField } from "@mui/material";
import React from "react";
import { ThemeContext } from "../App";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const navigate = useNavigate();
  const { authContext, setAuthContext } = React.useContext(ThemeContext);
  const [objNote, setObjNote] = React.useState({
    id: new Date().getTime(),
    title: "",
    body: "",
  });

  const onFieldChanage = (e: any) => {
    setObjNote({
      ...objNote,
      [e.target.name]: e.target.value,
    });
  };

  const onAdd = () => {
    if (objNote.title == "" || objNote.body == "") {
      alert("Pelase enter all data");
      return;
    }
    setAuthContext({
      ...authContext,
      user: [...authContext.user, objNote],
    });
    navigate("/display");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#d3d3d33b",
      }}
    >
      <form
        style={{
          width: "500px",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
        }}
        onSubmit={onAdd}
      >
        <div>
          <TextField
            type="text"
            label="Title"
            name="title"
            variant="outlined"
            value={objNote.title}
            fullWidth
            onChange={(e) => onFieldChanage(e)}
            required
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <TextField
            type="text"
            label="Body"
            name="body"
            variant="outlined"
            value={objNote.body}
            fullWidth
            required
            onChange={(e) => onFieldChanage(e)}
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            onClick={() => onAdd()}
          >
            Add
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Add;
