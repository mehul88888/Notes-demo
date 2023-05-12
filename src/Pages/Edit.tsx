import { Button, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { ThemeContext } from "../App";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  console.log(id, "id");
  const { authContext, setAuthContext } = React.useContext(ThemeContext);
  const [objNote, setObjNote] = React.useState({
    id: new Date().getTime(),
    title: "",
    body: "",
  });

  useEffect(() => {
    let objTmp = authContext.user.find((obj: any) => obj.id == id);
    if (objTmp) setObjNote(objTmp);
  }, [id]);
  const onFieldChanage = (e: any) => {
    setObjNote({
      ...objNote,
      [e.target.name]: e.target.value,
    });
  };

  const onEdit = () => {
    if (objNote.title == "" || objNote.body == "") {
      alert("Pelase enter all data");
      return;
    }
    let lstTmp = authContext.user.map((obj: any) => {
      if (obj.id == id) {
        return objNote;
      } else {
        return obj;
      }
    });
    setAuthContext({
      ...authContext,
      user: lstTmp,
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
        onSubmit={onEdit}
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
            onChange={(e) => onFieldChanage(e)}
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <Button
            variant="contained"
            type="submit"
            fullWidth
            onClick={() => onEdit()}
          >
            Edit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
