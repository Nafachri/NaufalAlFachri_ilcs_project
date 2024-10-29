import React from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  InputLabel,
} from "@mui/material";

const EditEmployeeModal = ({
  open,
  onClose,
  onEditEmployee,
  formData,
  setFormData,
}) => {
  const handleEditEmployee = async () => {
    onEditEmployee(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          marginBottom={4}
        >
          Edit Employee
        </Typography>
        <InputLabel>NIK</InputLabel>
        <TextField
          disabled
          name="nik"
          value={formData.nik}
          onChange={handleChange}
          fullWidth
          margin="dense"
          required
        />

        <InputLabel>Name</InputLabel>
        <TextField
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="dense"
          required
        />

        <InputLabel>Address</InputLabel>
        <TextField
          name="address"
          value={formData.address}
          onChange={handleChange}
          fullWidth
          margin="dense"
          required
        />

        <InputLabel>Birth Date</InputLabel>
        <TextField
          type="date"
          name="birthdate"
          value={formData.birthdate}
          onChange={handleChange}
          fullWidth
          margin="dense"
          required
        />

        <InputLabel>Division</InputLabel>
        <Select
          disabled
          name="division"
          value={formData.division}
          onChange={handleChange}
          fullWidth
          margin="dense"
          required
        >
          <MenuItem value="">Select Division</MenuItem>
          <MenuItem value="IT">IT</MenuItem>
          <MenuItem value="HRD">HRD</MenuItem>
          <MenuItem value="FINANCE">Finance</MenuItem>
        </Select>

        <InputLabel>Status</InputLabel>
        <Select
          name="status"
          value={formData.status}
          onChange={handleChange}
          fullWidth
          margin="dense"
          required
        >
          <MenuItem value="">Select Status</MenuItem>
          <MenuItem value="Tetap">Tetap</MenuItem>
          <MenuItem value="Kontrak">Kontrak</MenuItem>
        </Select>
        <Button
          sx={{ marginTop: "15px", display: "flex", justifySelf: "center" }}
          variant="contained"
          color="primary"
          onClick={handleEditEmployee}
          disabled={
            formData.name.length === 0 ||
            formData.address.left === 0 ||
            formData.birthdate === "" ||
            formData.division.length === 0 ||
            formData.status.length === 0
              ? true
              : false
          }
        >
          Edit Employee
        </Button>
      </Box>
    </Modal>
  );
};

export default EditEmployeeModal;
