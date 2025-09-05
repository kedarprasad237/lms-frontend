import React, { useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  LinearProgress,
  Chip,
} from '@mui/material';
import {
  TrendingUp,
  CheckCircle,
  Pending,
  Code,
  Computer,
  DataObject,
  School,
  Psychology,
  Memory,
  Assignment,
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchProgressSummary } from '../../store/slices/progressSlice';
import { fetchTopics } from '../../store/slices/topicSlice';
import LoadingSpinner from '../common/LoadingSpinner';

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { summary, loading } = useAppSelector((state: any) => state.progress);
  const { loading: topicsLoading } = useAppSelector((state: any) => state.topics);

  useEffect(() => {
    dispatch(fetchProgressSummary());
    dispatch(fetchTopics());
  }, [dispatch]);

  if (loading || topicsLoading) {
    return <LoadingSpinner message="Loading your progress..." />;
  }

  // Safety check for summary
  if (!summary) {
    return <LoadingSpinner message="Loading your progress..." />;
  }


  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <Container maxWidth="lg" sx={{ pt: 4, pb: 4 }}>
        {/* Hero Section with Student Image */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' }, 
          alignItems: 'center', 
          gap: 4, 
          mb: 6,
          p: 4,
          color: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <Box sx={{ flex: 1, zIndex: 2 }}>
            <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
              Master Data Structures & Algorithms
            </Typography>
            <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
              Join thousands of developers who are advancing their careers with our comprehensive DSA learning platform. Track your progress, solve problems, and ace your technical interviews.
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
              <Chip 
                icon={<Code />} 
                label="Programming" 
                sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 'bold' }} 
              />
              <Chip 
                icon={<Computer />} 
                label="Operating Systems" 
                sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 'bold' }} 
              />
              <Chip 
                icon={<DataObject />} 
                label="Data Structures" 
                sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 'bold' }} 
              />
              <Chip 
                icon={<Psychology />} 
                label="Algorithms" 
                sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 'bold' }} 
              />
              <Chip 
                icon={<Memory />} 
                label="JavaScript" 
                sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 'bold' }} 
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="h4" sx={{ color: '#ffd700' }}>★</Typography>
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
          <Box sx={{ 
            flex: 1, 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            position: 'relative',
            zIndex: 2
          }}>
            <Box
              sx={{
                width: { xs: 300, md: 400 },
                height: { xs: 300, md: 400 },
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255,255,255,0.2)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Student studying illustration */}
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                gap: 2
              }}>
                <Box sx={{
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2
                }}>
                  <School sx={{ fontSize: 60, opacity: 0.9 }} />
                </Box>
                <Typography variant="h6" sx={{ textAlign: 'center', opacity: 0.8 }}>
                  Future Software Engineer
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#4caf50' }} />
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#ff9800' }} />
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#f44336' }} />
                </Box>
              </Box>
            </Box>
          </Box>
          {/* Decorative elements */}
          <Box
            sx={{
              position: 'absolute',
              top: -50,
              right: -50,
              width: 200,
              height: 200,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.05)',
              zIndex: 1,
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: -30,
              left: -30,
              width: 150,
              height: 150,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.05)',
              zIndex: 1,
            }}
          />
        </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Top Row - Overall Progress and Statistics */}
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
            {/* Overall Progress Card */}
            <Box sx={{ flex: 1 }}>
              <Card sx={{ 
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
              }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Box sx={{ 
                      p: 1, 
                      borderRadius: '50%', 
                      bgcolor: 'primary.light', 
                      mr: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <TrendingUp color="primary" sx={{ fontSize: 24 }} />
                    </Box>
                    <Box>
                      <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
                        CSE Learning Progress
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Track your journey
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h3" color="primary">
                      {summary.percentage || 0}%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {summary.completed || 0} of {summary.total || 0} CS concepts mastered
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={summary.percentage || 0}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </CardContent>
              </Card>
            </Box>

            {/* Statistics Card */}
            <Box sx={{ flex: 1 }}>
              <Card sx={{ 
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
              }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Box sx={{ 
                      p: 1, 
                      borderRadius: '50%', 
                      bgcolor: 'secondary.light', 
                      mr: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Assignment color="secondary" sx={{ fontSize: 24 }} />
                    </Box>
                    <Box>
                      <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
                        Learning Analytics
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Your achievements
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 3 }}>
                    <Box sx={{ 
                      flex: 1, 
                      textAlign: 'center',
                      p: 2,
                      borderRadius: 2,
                      bgcolor: 'rgba(76, 175, 80, 0.05)',
                      border: '1px solid rgba(76, 175, 80, 0.2)'
                    }}>
                      <Box sx={{ 
                        display: 'inline-flex',
                        p: 1.5,
                        borderRadius: '50%',
                        bgcolor: 'success.light',
                        mb: 1
                      }}>
                        <CheckCircle color="success" sx={{ fontSize: 32 }} />
                      </Box>
                      <Typography variant="h4" color="success.main" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                        {summary.completed || 0}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: '500' }}>
                        Concepts Mastered
                      </Typography>
                    </Box>
                    <Box sx={{ 
                      flex: 1, 
                      textAlign: 'center',
                      p: 2,
                      borderRadius: 2,
                      bgcolor: 'rgba(255, 152, 0, 0.05)',
                      border: '1px solid rgba(255, 152, 0, 0.2)'
                    }}>
                      <Box sx={{ 
                        display: 'inline-flex',
                        p: 1.5,
                        borderRadius: '50%',
                        bgcolor: 'warning.light',
                        mb: 1
                      }}>
                        <Pending color="warning" sx={{ fontSize: 32 }} />
                      </Box>
                      <Typography variant="h4" color="warning.main" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                        {summary.pending || 0}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: '500' }}>
                        In Progress
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Box>

          {/* Learning Streak */}
          <Card sx={{ 
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Box sx={{ 
                  p: 1, 
                  borderRadius: '50%', 
                  bgcolor: 'primary.light', 
                  mr: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <School color="primary" sx={{ fontSize: 24 }} />
                </Box>
                <Box>
                  <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
                    Learning Streak
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Keep the momentum going!
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" color="primary.main" sx={{ fontWeight: 'bold' }}>
                    7
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Days
                  </Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Keep up the great work! You're on a learning streak.
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={70}
                    color="primary"
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>

        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard;
