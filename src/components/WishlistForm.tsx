import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { RedeemOutlined } from "@mui/icons-material";
import axios from "axios";
import { Snackbar } from "@mui/base";
import { Alert, Slide } from "@mui/material";

const theme = createTheme();

export default function WishlistForm() {
  const [error, setError] = useState<string | null>(null);
  const [doShowSuccessAlert, setDoShowSuccessAlert] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const clearError = () => {
    setError(null);
  };

  const resetForm = () => {
    setMessage("");
    setUsername("");
  };

  const isFormReadyToSubmit = () => {
    return !!message && !!username;
  };

  const handleSubmit = () => {
    clearError();
    if (!isFormReadyToSubmit()) {
      return;
    }

    axios
      .post("/api/messages", {
        username,
        message,
      })
      .then(() => {
        setDoShowSuccessAlert(true);
        resetForm();
      })
      .catch(function (error) {
        if (error.response) {
          setError(error.response.data?.error);
        } else {
          setError(
            "An error occured while submitting your message. Please verify your information and try again."
          );
        }
      });
  };

  return (
    <ThemeProvider theme={theme}>
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
          <Avatar sx={{ m: 1, bgcolor: "red" }}>
            <RedeemOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Send your message to Santa!
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              error={!!error || !username}
              helperText={error}
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              value={username}
              autoFocus
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              error={!message}
              rows={6}
              maxRows={8}
              multiline
              fullWidth
              name="message"
              label="Message to Santa"
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button
              fullWidth
              disabled={!isFormReadyToSubmit}
              onClick={handleSubmit}
              color="error"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Send your message
            </Button>
            <Snackbar
              open={doShowSuccessAlert}
              autoHideDuration={4000}
              onClose={() => setDoShowSuccessAlert(false)}
            >
              <Alert
                onClose={() => setDoShowSuccessAlert(false)}
                severity="success"
                sx={{ width: "100%" }}
              >
                Your message was successfully submitted!
              </Alert>
            </Snackbar>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
