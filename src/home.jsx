import React, { useEffect, useState } from "react";
import { Typography, Container, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, TablePagination, AppBar, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";

function Home() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        "https://us-central1-ep52-project.cloudfunctions.net/ep52-movie-crud"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch movies.");
      }
      const data = await response.json();
      setMovies(data.movies || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleUpdateClick = (id) => {
    // Redirect to the update page with the movie ID in the query parameter
    window.location.href = `/updateReview?id=${id}`;
  };

  const handleDeleteClick = async (id) => {
    try {
      const response = await fetch(`https://us-central1-ep52-project.cloudfunctions.net/ep52-movie-crud/${id}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        throw new Error("Failed to delete movie.");
      }

      // Refresh the movie list after deletion
      fetchMovies();
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  return (
    <>
      <AppBar position="fixed" style={{ backgroundColor: "#4caf50", width: "100%" }}>
        <Toolbar style={{ justifyContent: "space-between" }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold", fontSize: "1.5rem", alignSelf: "flex-start", marginTop: "15px" }}>
            Movie Review Management System
          </Typography>
          <div>
            <Button variant="contained" color="primary" style={{ backgroundColor: "#4caf50", marginRight: "10px" }} component={Link} to="/addReview">
              Add Review
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: "64px" }}>
        <TableContainer component={Paper} style={{ backgroundColor: "#4caf50" }}>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: "#81c784" }}>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Comments</TableCell>
                <TableCell>Actions</TableCell>{/* Added Actions column */}
              </TableRow>
            </TableHead>
            <TableBody>
              {movies.map((movie, index) => (
                <TableRow key={movie.id} style={{ backgroundColor: index % 2 === 0 ? "#ffffff" : "#c8e6c9" }}>
                  <TableCell>{movie.firstName}</TableCell>
                  <TableCell>{movie.lastName}</TableCell>
                  <TableCell>{movie.email}</TableCell>
                  <TableCell>{movie.comments}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" style={{ marginRight: "10px" }} onClick={() => handleUpdateClick(movie.id)}>
                      Update
                    </Button>
                    <Button variant="contained" color="error" onClick={() => handleDeleteClick(movie.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={movies.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Container>
    </>
  );
}

export default Home;
