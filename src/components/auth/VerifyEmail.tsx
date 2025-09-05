import React, { useEffect, useState } from 'react';
import {
  Container,
  Paper,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { verifyEmail, clearError } from '../../store/slices/authSlice';
import { useSearchParams, useNavigate, Link as RouterLink } from 'react-router-dom';

const VerifyEmail: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { loading, error } = useAppSelector((state) => state.auth);
  const [verified, setVerified] = useState(false);

  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      dispatch(clearError());
      dispatch(verifyEmail(token)).then((result) => {
        if (verifyEmail.fulfilled.match(result)) {
          setVerified(true);
        }
      });
    }
  }, [token, dispatch]);

  if (!token) {
    return (
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Paper elevation={3} sx={{ padding: 4, width: '100%' }}>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Typography component="h1" variant="h4" color="primary">
                DSA Sheet App
              </Typography>
              <Typography variant="h5" component="h2" sx={{ mt: 1 }}>
                Email Verification
              </Typography>
              <Alert severity="error" sx={{ mt: 2 }}>
                Invalid verification link
              </Alert>
              <Button
                component={RouterLink}
                to="/login"
                variant="contained"
                sx={{ mt: 2 }}
              >
                Back to Login
              </Button>
            </Box>
          </Paper>
        </Box>
      </Container>
    );
  }

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ padding: 4, width: '100%' }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography component="h1" variant="h4" color="primary">
              DSA Sheet App
            </Typography>
            <Typography variant="h5" component="h2" sx={{ mt: 1 }}>
              Email Verification
            </Typography>
          </Box>

          {loading && (
            <Box sx={{ textAlign: 'center', my: 3 }}>
              <CircularProgress />
              <Typography variant="body2" sx={{ mt: 1 }}>
                Verifying your email...
              </Typography>
            </Box>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {verified && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Email verified successfully! You can now sign in to your account.
            </Alert>
          )}

          {!loading && !error && !verified && (
            <Alert severity="info" sx={{ mb: 2 }}>
              Please wait while we verify your email...
            </Alert>
          )}

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Button
              component={RouterLink}
              to="/login"
              variant="contained"
              sx={{ mt: 2 }}
            >
              Back to Login
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default VerifyEmail;


