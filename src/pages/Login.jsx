// import * as React from 'react';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SnackBarComponent from "../components/SnackBarComponent";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

export default function Login() {
  // const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [displaySnackbar, setDisplaySnackbar] = useState(false);
  const [resMessage, setResMessage] = useState("success");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = {
      email: data.get("email"),
      password: data.get("password"),
    };

    let responseData = "";
    try {
      const res = await fetch("http://127.0.0.1:3000/api/v1/voters/login", {
        // const res = await fetch(
        // "https://puta-election-app-backend.onrender.com/api/v1/voters/login",
        // {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
      );

      responseData = await res.json();
      //   console.log(data);
      if (responseData.status === "success") {
        // set the token in the local storage
        // setLoggedIn(true);
        localStorage.setItem("authToken", responseData.token);
        localStorage.setItem("username", data.get("email"));
        setTimeout(() => {
          navigate("/");
        }, 5000);
      }
    } catch (err) {
      console.error("Error: ", err);
    }

    if (responseData.status === "success") {
      setResMessage(responseData.status);
    } else {
      setResMessage(responseData.message);
    }
    setDisplaySnackbar(true);

    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });
  };

  const onCloseHandler = () => {
    setDisplaySnackbar(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1, margin: "1 auto" }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Box height={20} />
                <Typography variant="subtitle.1" color="#212529">
                  Your Email is First Name followed by symbol(@), and then your
                  Receipt ID
                </Typography>
                <br />
                <Typography variant="subtitle.1" color="#212529">
                  For example: rohan@263, or siddharth@321
                </Typography>
                {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
              </Grid>
              {/* <Grid item>
                <Link to="/SignUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid> */}
            </Grid>
          </Box>
          {displaySnackbar === true && (
            <SnackBarComponent
              open={displaySnackbar}
              message={resMessage}
              autoHideDuration={6000}
              severity={resMessage === "success" ? "success" : "error"}
              onClose={onCloseHandler}
            />
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
