import * as React from "react";
import { Box, Button, Container, Paper } from "@mui/material";
import { ThemeContext } from "../App";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridColDef, GridToolbarQuickFilter } from "@mui/x-data-grid";

function QuickSearchToolbar() {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
      }}
    >
      <GridToolbarQuickFilter />
    </Box>
  );
}

export default function Display() {
  const navigate = useNavigate();
  const { authContext, setAuthContext } = React.useContext(ThemeContext);
  const [lstNote, setLstNote] = React.useState(authContext.user);

  const columns: GridColDef[] = [
    { field: "title", headerName: "Title", flex: 1 },
    { field: "body", headerName: "Body", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      align: "right",
      headerAlign: "right",
      sortable: false,
      renderCell(row) {
        return (
          <>
            <Button
              color="primary"
              variant="outlined"
              onClick={() => navigate(`/edit/${row.id}`)}
            >
              Edit
            </Button>
            <Button
              color="error"
              variant="outlined"
              style={{ marginLeft: "5px" }}
              onClick={() => {
                let lstTmp = authContext.user.filter(
                  (obj: any) => obj.id != row.id
                );
                setLstNote(lstTmp);
                setAuthContext({
                  ...authContext,
                  user: lstTmp,
                });
              }}
            >
              Delete
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <Container maxWidth="lg">
      <Paper style={{ padding: "30px", marginTop: "30px" }}>
        <div style={{ fontSize: "28px", fontWeight: 600 }}>Todo List</div>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <Button
            variant="contained"
            onClick={() => navigate("/add")}
            style={{ margin: "10px 0px" }}
          >
            Add
          </Button>
        </div>
        <DataGrid
          rows={lstNote}
          columns={columns}
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          slots={{ toolbar: QuickSearchToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              csvOptions: false,
            },
          }}
        />
      </Paper>
    </Container>
  );
}
