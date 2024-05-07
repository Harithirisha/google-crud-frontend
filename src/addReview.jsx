import React, { useState } from "react";
import { Typography, Container, TextField, Button, AppBar, Toolbar, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

function AddStudent() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    comments: "",
    options: ""
  });

  const [validationErrors, setValidationErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    comments: "",
    options: ""
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation
    const nameRegex = /^[A-Za-z]+( [A-Za-z]+)*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const errors = {};

    if (!formData.firstName.match(nameRegex)) {
      errors.firstName = "First Name must contain only letters and spaces.";
    }

    if (!formData.lastName.match(nameRegex)) {
      errors.lastName = "Last Name must contain only letters and spaces.";
    }

    if (!formData.email.endsWith("gmail.com") || !formData.email.match(emailRegex)) {
      errors.email = "Email must end with 'gmail.com' and be in a valid email format.";
    }

    if (formData.comments && !formData.comments.match(nameRegex)) {
      errors.comments = "Comments must contain only letters and spaces.";
    }

    if (formData.options && !formData.options.match(nameRegex)) {
      errors.options = "Options must contain only letters and spaces.";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      const response = await fetch("https://us-central1-ep52-project.cloudfunctions.net/ep52-movie-crud", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Failed to add student.");
      }

      // Reset form data after successful submission
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        comments: "",
        options: ""
      });

      // Show success dialog
      setDialogOpen(true);
      setDialogContent("Student added successfully!");

    } catch (error) {
      console.error("Error adding student:", error);
      // Show error dialog
      setDialogOpen(true);
      setDialogContent("Failed to add student. Please try again later.");
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <AppBar position="fixed" style={{ backgroundColor: "#4caf50", width: "100%" }}>
        <Toolbar style={{ justifyContent: "space-between" }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold", fontSize: "1.5rem", alignSelf: "flex-start", marginTop: "15px" }}>
            Create Student
          </Typography>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: "64px" }}>
        <form onSubmit={handleSubmit}>
          <Container maxWidth="sm">
            <TextField
              name="firstName"
              label="First Name"
              variant="outlined"
              fullWidth
              value={formData.firstName}
              onChange={handleChange}
              error={!!validationErrors.firstName}
              helperText={validationErrors.firstName}
              required
              margin="normal"
            />
            <TextField
              name="lastName"
              label="Last Name"
              variant="outlined"
              fullWidth
              value={formData.lastName}
              onChange={handleChange}
              error={!!validationErrors.lastName}
              helperText={validationErrors.lastName}
              required
              margin="normal"
            />
            <TextField
              name="email"
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              value={formData.email}
              onChange={handleChange}
              error={!!validationErrors.email}
              helperText={validationErrors.email}
              required
              margin="normal"
            />
            <TextField
              name="comments"
              label="Comments"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              value={formData.comments}
              onChange={handleChange}
              error={!!validationErrors.comments}
              helperText={validationErrors.comments}
              margin="normal"
            />
            <TextField
              name="options"
              label="Options"
              variant="outlined"
              fullWidth
              value={formData.options}
              onChange={handleChange}
              error={!!validationErrors.options}
              helperText={validationErrors.options}
              margin="normal"
            />
            <Button type="submit" variant="contained" color="success">
              Add Student
            </Button>
          </Container>
        </form>
      </Container>

      {/* Dialog for success or failure */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{dialogContent}</DialogTitle>
        <DialogContent>
          {dialogContent === "Failed to add student. Please try again later." && (
            <Typography color="error">Failed to add student. Please try again later.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddStudent;
