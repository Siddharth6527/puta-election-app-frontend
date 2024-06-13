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
import { ChangePasswordInServer } from '../utils/serverFunctions';

const defaultTheme = createTheme();

export default function ChangePassword() {

    const navigate = useNavigate();

    const [displaySnackbar, setDisplaySnackbar] = useState(false);
    const [resMessage, setResMessage] = useState("success");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const body = {
            email: data.get("email"),
            password: data.get("password"),
            NewPassword: data.get("NewPassword"),
            ConfirmNewPassword: data.get("ConfirmNewPassword")
        };

        let responseData = "";
        try {
            responseData = await ChangePasswordInServer(body);
            if (responseData === "success") {
                localStorage.setItem("authToken", responseData.token);
                localStorage.setItem("username", data.get("email"));
                setResMessage(responseData);
                setDisplaySnackbar(true);
                setTimeout(() => navigate('/'), 1000);
                setTimeout(() => navigate(0), 1000);
            }
            else {
                setResMessage(responseData);
                setDisplaySnackbar(true);
            }
        } catch (err) {
            console.error("Error: ", err);
        }
    }

    const onCloseHandler = () => {
        setDisplaySnackbar(false);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs" className="mb-3">
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
                        Change Password
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
                            label="Username"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Current Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="NewPassword"
                            label="New Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="ConfirmNewPassword"
                            label="Confirm new password"
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
                            Change Password
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Box height={20} />
                                <Typography variant="subtitle.1" color="#212529">
                                    Your Username is First Name followed by symbol(@), and then your
                                    Receipt ID
                                </Typography>
                                <br />
                                <Typography variant="subtitle.1" color="#212529">
                                    For example: rohan@263, or siddharth@321
                                </Typography>
                            </Grid>
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
