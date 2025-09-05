import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Chip,
  Avatar,
  Stack,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  School,
  Code,
  TrendingUp,
  CheckCircle,
  PlayArrow,
  Star,
  GitHub,
  LinkedIn,
  Twitter,
  Person,
  Group,
  Engineering,
  Computer,
  DataObject,
  Psychology,
  Memory,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const features = [
    {
      icon: <Code sx={{ fontSize: 40, color: '#1976d2' }} />,
      title: 'Comprehensive DSA Topics',
      description: 'Master Data Structures and Algorithms with our curated collection of topics covering everything from basics to advanced concepts.',
    },
    {
      icon: <TrendingUp sx={{ fontSize: 40, color: '#4caf50' }} />,
      title: 'Track Your Progress',
      description: 'Monitor your learning journey with detailed progress tracking, completion rates, and personalized insights.',
    },
    {
      icon: <School sx={{ fontSize: 40, color: '#ff9800' }} />,
      title: 'Structured Learning Path',
      description: 'Follow a well-organized curriculum designed by experts to help you learn DSA systematically and efficiently.',
    },
  ];

  const stats = [
    { number: '500+', label: 'DSA Problems' },
    { number: '50+', label: 'Topics Covered' },
    { number: '1000+', label: 'Happy Learners' },
    { number: '95%', label: 'Success Rate' },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Software Engineer at Google',
      content: 'This platform helped me land my dream job at Google. The structured approach and progress tracking made all the difference.',
      avatar: 'SJ',
    },
    {
      name: 'Mike Chen',
      role: 'Full Stack Developer',
      content: 'The best DSA learning platform I\'ve used. The combination of theory and practice is perfect for interview preparation.',
      avatar: 'MC',
    },
    {
      name: 'Emily Davis',
      role: 'Frontend Developer',
      content: 'Amazing resource for learning algorithms. The progress tracking keeps me motivated and on track with my goals.',
      avatar: 'ED',
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      {/* Professional Header */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        py: 2,
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{
                width: 50,
                height: 50,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255,255,255,0.3)',
              }}>
                <School sx={{ fontSize: 30, color: 'white' }} />
              </Box>
              <Box>
                <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                  CSE Learning Platform
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Master Computer Science Engineering
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                onClick={() => navigate('/login')}
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  px: 3,
                  py: 1,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 'bold',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.1)',
                    borderColor: 'white',
                  },
                }}
              >
                Sign In
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate('/signup')}
                sx={{
                  bgcolor: 'white',
                  color: '#1976d2',
                  px: 3,
                  py: 1,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 'bold',
                  '&:hover': {
                    bgcolor: '#f5f5f5',
                  },
                }}
              >
                Get Started
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'center' }}>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 'bold',
                  mb: 3,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  lineHeight: 1.2,
                }}
              >
                Master Data Structures & Algorithms
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  opacity: 0.9,
                  fontSize: { xs: '1.1rem', md: '1.3rem' },
                  lineHeight: 1.6,
                }}
              >
                Join thousands of developers who are advancing their careers with our comprehensive DSA learning platform. Track your progress, solve problems, and ace your technical interviews.
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Star sx={{ color: '#ffd700', fontSize: 20 }} />
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    4.9/5 Rating
                  </Typography>
                </Box>
                <Chip
                  label="1000+ Happy Users"
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                />
              </Box>
            </Box>
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
              {/* Student Images Grid */}
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(2, 1fr)', 
                gap: 3,
                width: { xs: 300, md: 400 },
                height: { xs: 300, md: 400 },
                position: 'relative'
              }}>
                {/* Student 1 - Programming */}
                <Box sx={{
                  background: 'rgba(255,255,255,0.15)',
                  borderRadius: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: 2,
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <Box sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 1
                  }}>
                    <Code sx={{ fontSize: 30, color: 'white' }} />
                  </Box>
                  <Typography variant="body2" sx={{ textAlign: 'center', fontWeight: 'bold', opacity: 0.9 }}>
                    Programming
                  </Typography>
                  <Typography variant="caption" sx={{ textAlign: 'center', opacity: 0.7 }}>
                    Student
                  </Typography>
                </Box>

                {/* Student 2 - Data Structures */}
                <Box sx={{
                  background: 'rgba(255,255,255,0.15)',
                  borderRadius: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: 2,
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <Box sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 1
                  }}>
                    <DataObject sx={{ fontSize: 30, color: 'white' }} />
                  </Box>
                  <Typography variant="body2" sx={{ textAlign: 'center', fontWeight: 'bold', opacity: 0.9 }}>
                    Data Structures
                  </Typography>
                  <Typography variant="caption" sx={{ textAlign: 'center', opacity: 0.7 }}>
                    Student
                  </Typography>
                </Box>

                {/* Student 3 - Algorithms */}
                <Box sx={{
                  background: 'rgba(255,255,255,0.15)',
                  borderRadius: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: 2,
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <Box sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 1
                  }}>
                    <Psychology sx={{ fontSize: 30, color: 'white' }} />
                  </Box>
                  <Typography variant="body2" sx={{ textAlign: 'center', fontWeight: 'bold', opacity: 0.9 }}>
                    Algorithms
                  </Typography>
                  <Typography variant="caption" sx={{ textAlign: 'center', opacity: 0.7 }}>
                    Student
                  </Typography>
                </Box>

                {/* Student 4 - JavaScript */}
                <Box sx={{
                  background: 'rgba(255,255,255,0.15)',
                  borderRadius: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: 2,
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <Box sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 1
                  }}>
                    <Memory sx={{ fontSize: 30, color: 'white' }} />
                  </Box>
                  <Typography variant="body2" sx={{ textAlign: 'center', fontWeight: 'bold', opacity: 0.9 }}>
                    JavaScript
                  </Typography>
                  <Typography variant="caption" sx={{ textAlign: 'center', opacity: 0.7 }}>
                    Student
                  </Typography>
                </Box>
              </Box>

              {/* Central Achievement Badge */}
              <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255,255,255,0.3)',
                zIndex: 2
              }}>
                <School sx={{ fontSize: 40, color: 'white' }} />
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: '#f8f9fa' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 'bold',
                mb: 3,
                color: '#2c3e50',
              }}
            >
              Why Choose Our Platform?
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: '#6c757d',
                maxWidth: 600,
                mx: 'auto',
              }}
            >
              We provide everything you need to master Data Structures and Algorithms
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
            {features.map((feature, index) => (
              <Box key={index} sx={{ flex: 1 }}>
                <Card
                  sx={{
                    height: '100%',
                    textAlign: 'center',
                    p: 3,
                    borderRadius: 3,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 16px 48px rgba(0,0,0,0.15)',
                    },
                  }}
                >
                  <CardContent>
                    <Box sx={{ mb: 3 }}>
                      {feature.icon}
                    </Box>
                    <Typography
                      variant="h5"
                      component="h3"
                      sx={{
                        fontWeight: 'bold',
                        mb: 2,
                        color: '#2c3e50',
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: '#6c757d',
                        lineHeight: 1.6,
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: '#1976d2', color: 'white' }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', flexDirection: { xs: 'row', md: 'row' }, gap: 4, flexWrap: 'wrap' }}>
            {stats.map((stat, index) => (
              <Box key={index} sx={{ flex: { xs: '1 1 calc(50% - 16px)', md: '1 1 calc(25% - 24px)' }, textAlign: 'center' }}>
                <Typography
                  variant="h3"
                  component="div"
                  sx={{
                    fontWeight: 'bold',
                    mb: 1,
                    fontSize: { xs: '2rem', md: '3rem' },
                  }}
                >
                  {stat.number}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    opacity: 0.9,
                    fontSize: { xs: '1rem', md: '1.2rem' },
                  }}
                >
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 'bold',
                mb: 3,
                color: '#2c3e50',
              }}
            >
              What Our Users Say
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: '#6c757d',
                maxWidth: 600,
                mx: 'auto',
              }}
            >
              Join thousands of developers who have transformed their careers
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
            {testimonials.map((testimonial, index) => (
              <Box key={index} sx={{ flex: 1 }}>
                <Card
                  sx={{
                    height: '100%',
                    p: 3,
                    borderRadius: 3,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 16px 48px rgba(0,0,0,0.15)',
                    },
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Avatar
                        sx={{
                          bgcolor: '#1976d2',
                          mr: 2,
                          width: 50,
                          height: 50,
                        }}
                      >
                        {testimonial.avatar}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#6c757d' }}>
                          {testimonial.role}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography
                      variant="body1"
                      sx={{
                        color: '#6c757d',
                        lineHeight: 1.6,
                        fontStyle: 'italic',
                      }}
                    >
                      "{testimonial.content}"
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 'bold',
                mb: 3,
                fontSize: { xs: '2rem', md: '3rem' },
              }}
            >
              Ready to Start Your Journey?
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mb: 4,
                opacity: 0.9,
                maxWidth: 600,
                mx: 'auto',
              }}
            >
              Join thousands of developers who are already mastering DSA and advancing their careers
            </Typography>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              sx={{ justifyContent: 'center' }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/signup')}
                sx={{
                  bgcolor: 'white',
                  color: '#1976d2',
                  px: 6,
                  py: 2,
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  borderRadius: 3,
                  textTransform: 'none',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                  '&:hover': {
                    bgcolor: '#f5f5f5',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Get Started Free
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/login')}
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  px: 6,
                  py: 2,
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  borderRadius: 3,
                  textTransform: 'none',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.1)',
                    borderColor: 'white',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Sign In
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: '#2c3e50', color: 'white', py: 6 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                DSA Learning Platform
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.8, mb: 3 }}>
                Master Data Structures and Algorithms with our comprehensive learning platform. 
                Track your progress and ace your technical interviews.
              </Typography>
              <Stack direction="row" spacing={2}>
                <Avatar sx={{ bgcolor: '#1976d2' }}>
                  <GitHub />
                </Avatar>
                <Avatar sx={{ bgcolor: '#1976d2' }}>
                  <LinkedIn />
                </Avatar>
                <Avatar sx={{ bgcolor: '#1976d2' }}>
                  <Twitter />
                </Avatar>
              </Stack>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Quick Links
              </Typography>
              <Stack spacing={1}>
                <Button
                  color="inherit"
                  onClick={() => navigate('/login')}
                  sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
                >
                  Sign In
                </Button>
                <Button
                  color="inherit"
                  onClick={() => navigate('/signup')}
                  sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
                >
                  Sign Up
                </Button>
                <Button
                  color="inherit"
                  onClick={() => navigate('/forgot-password')}
                  sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
                >
                  Forgot Password
                </Button>
              </Stack>
            </Box>
          </Box>
          <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.1)', mt: 4, pt: 4, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              © 2024 DSA Learning Platform. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
