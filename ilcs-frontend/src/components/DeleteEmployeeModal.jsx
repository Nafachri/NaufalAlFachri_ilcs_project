import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

const DeleteEmployeeModal = ({
  open,
  onClose,
  onDeleteEmployee,
  currentEmployee,
}) => {
  const handleDeleteEmployee = async () => {
    onDeleteEmployee();
  };
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          p: 4,
        }}
      >
        <Typography textAlign="center">
          {`Are you sure you want to remove ${currentEmployee?.name} from your employee?`}
        </Typography>
        <Box display="flex" justifyContent="center">
          <Button
            sx={{ margin: "15px", display: "flex", justifySelf: "center" }}
            variant="contained"
            color="error"
            onClick={handleDeleteEmployee}
          >
            Delete
          </Button>
          <Button
            sx={{ margin: "15px", display: "flex", justifySelf: "center" }}
            variant="contained"
            color="primary"
            onClick={onClose}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteEmployeeModal;
