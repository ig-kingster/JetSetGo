import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import {
  Paper,
  Typography,
  CircularProgress,
  Box,
  Toolbar,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Delete, CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/userslist");
      const formattedUsers = response.data.map((user, index) => ({
        id: user._id,
        si_no: index + 1,
        user_name: user.user_name,
        user_email: user.user_email,
        user_phone: user.user_phone,
        user_address: user.user_address,
        user_photo:user.user_photo,
        user_proof:user.user_proof,
        

      }));
      setUsers(formattedUsers);
    } catch (error) {
      console.error("Error fetching users:", error.response || error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { field: "si_no", headerName: "SI No", width: 80 },
    { field: "user_name", headerName: "Name", flex: 1, sortable: true },
    { field: "user_email", headerName: "Email", flex: 1.5, sortable: true },
    { field: "user_phone", headerName: "Phone", flex: 1, sortable: true },
    { field: "user_address", headerName: "Address", flex: 2 },
    { 
      field: "user_photo", 
      headerName: "Photo", 
      flex: 1, 
      renderCell: (params) => (
        <img 
          src={params.value} 
          alt="User" 
          style={{ width: 50, height: 50, borderRadius: "50%" }} 
        />
      ) 
    },
    { 
      field: "user_proof", 
      headerName: "ID", 
      flex: 1, 
      renderCell: (params) => (
        <img 
          src={params.value} 
          alt="User" 
          style={{ width: 50, height: 50, borderRadius: "50%" }} 
        />
      ) 
    },
  ];

  return (
    <Paper style={{ padding: 20, margin: 20 }}>
      <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" fontWeight="bold">
          Users List
        </Typography>
        {selectedRows.length > 0 && (
          <Toolbar>
            <Typography variant="subtitle1" style={{ marginRight: 10 }}>
              {selectedRows.length} selected
            </Typography>
            <Tooltip title="Delete">
              <IconButton>
                <Delete color="error" />
              </IconButton>
            </Tooltip>
          </Toolbar>
        )}
      </Box>

      {loading ? (
        <CircularProgress style={{ display: "block", margin: "20px auto" }} />
      ) : (
        <DataGrid
          rows={users}
          columns={columns}
          checkboxSelection
          onRowSelectionModelChange={(newSelection) => setSelectedRows(newSelection)}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          disableSelectionOnClick
          getRowId={(row) => row.id}
          autoHeight
          sx={{
            minHeight: 400,
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#1976d2",
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
              textAlign: "center",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: "bold",
            },
            "& .MuiDataGrid-root": {
              marginTop: "10px",
            },
          }}
        />
      )}
    </Paper>
  );
};

export default Users;
