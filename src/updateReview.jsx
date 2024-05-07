import React, { useState, useEffect } from "react";
import { Typography, Container, TextField, Button, AppBar, Toolbar, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function UpdateReview() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');

  const [formData, setFormData] = useState({
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    comments: "",
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://us-central1-ep52-project.cloudfunctions.net/ep52-movie-crud/${id}`);
      if (response.data) {
        setFormData(response.data);
      } else {
        throw new Error("Data not found");
      }
    } catch (error) {
      console.error("Error while fetching data:", error.message);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(
        `https://us-central1-ep52-project.cloudfunctions.net/ep52-movie-crud/${formData.id}`,
        formData
      );

      if (!response.data.success) {
        throw new Error("Failed to update student.");
      }

      setDialogTitle("Success");
      setDialogContent("Student updated successfully!");
      setDialogOpen(true);

      navigate("/"); // Redirect to home page after successful update
    } catch (error) {
      console.error("Error updating student:", error);
      setDialogTitle("Error");
      setDialogContent(
        "Failed to update student. Please try again later."
      );
      setDialogOpen(true);
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
            Update Student
          </Typography>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: "64px" }}>
        <form onSubmit={handleSubmit}>
          <Container maxWidth="sm">
            <TextField
              name="id"
              type="text"
              label="ID"
              variant="outlined"
              fullWidth
              disabled // Disable ID field
              value={formData.id}
              onChange={handleChange}
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
              required
              margin="normal"
            />
            <TextField
              name="firstName"
              label="First Name"
              variant="outlined"
              fullWidth
              value={formData.firstName}
              onChange={handleChange}
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
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">
              Update Student
            </Button>
          </Container>
        </form>
      </Container>

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <Typography>{dialogContent}</Typography>
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

export default UpdateReview;
