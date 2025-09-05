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
import { register, googleLogin, clearError } from '../../store/slices/authSlice';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signup: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [passwordError, setPasswordError] = useState('');

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
    
    // Clear password error when user starts typing
    if (passwordError) {
      setPasswordError('');
    }
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return false;
    }
    if (formData.password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    dispatch(clearError());
    
    try {
      const result = await dispatch(register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      }));

      if (register.fulfilled.match(result)) {
        toast.success('Registration successful! Please check your email to verify your account.');
        navigate('/login');
      } else if (register.rejected.match(result)) {
        toast.error(result.payload as string || 'Registration failed');
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
              color: '#4caf50',
              width: 48,
              height: 48,
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 1)',
                transform: 'translateY(-2px)',
              },
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              zIndex: 10,
              border: '2px solid rgba(76, 175, 80, 0.2)',
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
                background: 'linear-gradient(135deg, #4caf50, #8bc34a)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2,
                boxShadow: '0 8px 32px rgba(76, 175, 80, 0.3)',
              }}>
                <Typography variant="h3" sx={{ color: 'white', fontWeight: 'bold' }}>
                  🎓
                </Typography>
              </Box>
              <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold', color: '#4caf50', mb: 1 }}>
                CSE Learning Platform
              </Typography>
              <Typography variant="h6" component="h2" sx={{ color: '#666', fontWeight: 400 }}>
                Start Your Engineering Journey!
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
              id="name"
              label="Full Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover fieldset': {
                    borderColor: '#4caf50',
                  },
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover fieldset': {
                    borderColor: '#4caf50',
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
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              error={!!passwordError}
              helperText={passwordError}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover fieldset': {
                    borderColor: '#4caf50',
                  },
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={loading}
              error={!!passwordError}
              helperText={passwordError}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover fieldset': {
                    borderColor: '#4caf50',
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
                background: 'linear-gradient(135deg, #4caf50, #8bc34a)',
                boxShadow: '0 4px 20px rgba(76, 175, 80, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #388e3c, #4caf50)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 25px rgba(76, 175, 80, 0.4)',
                },
                transition: 'all 0.3s ease',
                fontWeight: 'bold',
                fontSize: '1.1rem',
              }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Create Account & Start Learning'}
            </Button>

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
                borderColor: '#4caf50',
                color: '#4caf50',
                fontWeight: 'bold',
                fontSize: '1rem',
                '&:hover': {
                  borderColor: '#388e3c',
                  backgroundColor: 'rgba(76, 175, 80, 0.04)',
                  transform: 'translateY(-1px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Continue with Google
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: '#666' }}>
                Already have an account?{' '}
                <Link
                  component={RouterLink}
                  to="/login"
                  variant="body2"
                  sx={{ 
                    textDecoration: 'none',
                    color: '#4caf50',
                    fontWeight: 'bold',
                    '&:hover': {
                      textDecoration: 'underline',
                    }
                  }}
                >
                  Sign In
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

export default Signup;
