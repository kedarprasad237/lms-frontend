import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Link,
  Alert,
  Divider,
  CircularProgress,
  IconButton,
} from '@mui/material';
import { Google as GoogleIcon, ArrowBack } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { login, googleLogin, clearError } from '../../store/slices/authSlice';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (user && user.isVerified) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearError());
    
    try {
      const result = await dispatch(login(formData));
      
      if (login.fulfilled.match(result)) {
        if (result.payload.user && !result.payload.user.isVerified) {
          toast.warning('Please verify your email before logging in. Check your inbox for verification link.');
          return;
        }
        toast.success('Login successful!');
        navigate('/dashboard');
      } else if (login.rejected.match(result)) {
        toast.error(result.payload as string || 'Login failed');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      dispatch(clearError());
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const loginResult = await dispatch(googleLogin({
        name: user.displayName || '',
        email: user.email || '',
        googleId: user.uid,
        avatar: user.photoURL || '',
      }));

      if (googleLogin.fulfilled.match(loginResult)) {
        toast.success('Google login successful!');
        navigate('/dashboard');
      } else if (googleLogin.rejected.match(loginResult)) {
        toast.error(loginResult.payload as string || 'Google login failed');
      }
    } catch (error: any) {
      console.error('Google login error:', error);
      toast.error('Google login failed');
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      py: 4
    }}>
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          {/* Back Button */}
          <IconButton
            onClick={() => navigate('/')}
            sx={{
              position: 'absolute',
              top: 20,
              left: 20,
              bgcolor: 'rgba(255, 255, 255, 0.95)',
              color: '#1976d2',
              width: 48,
              height: 48,
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 1)',
                transform: 'translateY(-2px)',
              },
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              zIndex: 10,
              border: '2px solid rgba(25, 118, 210, 0.2)',
            }}
          >
            <ArrowBack />
          </IconButton>

          <Paper 
            elevation={10} 
            sx={{ 
              padding: { xs: 3, md: 4 }, 
              width: '100%',
              borderRadius: 3,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Box sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2,
                boxShadow: '0 8px 32px rgba(25, 118, 210, 0.3)',
              }}>
                <Typography variant="h3" sx={{ color: 'white', fontWeight: 'bold' }}>
                  👨‍💻
                </Typography>
              </Box>
              <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2', mb: 1 }}>
                CSE Learning Platform
              </Typography>
              <Typography variant="h6" component="h2" sx={{ color: '#666', fontWeight: 400 }}>
                Welcome Back, Future Engineer!
              </Typography>
            </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover fieldset': {
                    borderColor: '#1976d2',
                  },
                },
              }}
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
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover fieldset': {
                    borderColor: '#1976d2',
                  },
                },
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ 
                mt: 4, 
                mb: 2, 
                py: 1.5,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
                boxShadow: '0 4px 20px rgba(25, 118, 210, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #1565c0, #1976d2)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 25px rgba(25, 118, 210, 0.4)',
                },
                transition: 'all 0.3s ease',
                fontWeight: 'bold',
                fontSize: '1.1rem',
              }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In to Continue Learning'}
            </Button>

            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Link
                component={RouterLink}
                to="/forgot-password"
                variant="body2"
                sx={{ 
                  textDecoration: 'none',
                  color: '#1976d2',
                  fontWeight: 'bold',
                  '&:hover': {
                    textDecoration: 'underline',
                  }
                }}
              >
                Forgot your password?
              </Link>
            </Box>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" color="text.secondary" sx={{ px: 2, bgcolor: 'rgba(255, 255, 255, 0.95)' }}>
                OR
              </Typography>
            </Divider>

            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleLogin}
              disabled={loading}
              sx={{ 
                mb: 3,
                py: 1.5,
                borderRadius: 2,
                borderColor: '#1976d2',
                color: '#1976d2',
                fontWeight: 'bold',
                fontSize: '1rem',
                '&:hover': {
                  borderColor: '#1565c0',
                  backgroundColor: 'rgba(25, 118, 210, 0.04)',
                  transform: 'translateY(-1px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Continue with Google
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: '#666' }}>
                Don't have an account?{' '}
                <Link
                  component={RouterLink}
                  to="/signup"
                  variant="body2"
                  sx={{ 
                    textDecoration: 'none',
                    color: '#1976d2',
                    fontWeight: 'bold',
                    '&:hover': {
                      textDecoration: 'underline',
                    }
                  }}
                >
                  Create Account
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
    </Box>
  );
};

export default Login;
