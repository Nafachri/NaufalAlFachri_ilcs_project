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

const AddEmployeeModal = ({
  open,
  onClose,
  onAddEmployee,
  formData,
  setFormData,
}) => {
  const handleAddEmployee = async () => {
    onAddEmployee(formData);
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
          Add Employee
        </Typography>

        <InputLabel required>Name</InputLabel>
        <TextField
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="dense"
          required
        />

        <InputLabel required>Address</InputLabel>
        <TextField
          name="address"
          value={formData.address}
          onChange={handleChange}
          fullWidth
          margin="dense"
          required
        />

        <InputLabel required>Birth Date</InputLabel>
        <TextField
          type="date"
          name="birthdate"
          value={formData.birthdate}
          onChange={handleChange}
          fullWidth
          margin="dense"
          required
        />

        <InputLabel required>Division</InputLabel>
        <Select
          name="division"
          value={formData.division}
          onChange={handleChange}
          fullWidth
          margin="dense"
          required
        >
          <MenuItem value="">Select Division</MenuItem>
          <MenuItem value="IT">IT</MenuItem>
          <MenuItem value="HR">HRD</MenuItem>
          <MenuItem value="FINANCE">Finance</MenuItem>
        </Select>

        <InputLabel required>Status</InputLabel>
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
          sx={{ marginTop: "10px", display: "flex", justifySelf: "center" }}
          variant="contained"
          color="primary"
          onClick={handleAddEmployee}
        >
          Add Employee
        </Button>
      </Box>
    </Modal>
  );
};

export default AddEmployeeModal;
