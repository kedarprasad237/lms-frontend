import React, { useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  Alert,
} from '@mui/material';
import {
  TrendingUp,
  Assignment,
  CheckCircle,
  Pending,
  Code,
  Computer,
  DataObject,
  School,
  Psychology,
  Memory,
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchProgressSummary } from '../../store/slices/progressSlice';
import { fetchTopics } from '../../store/slices/topicSlice';
import LoadingSpinner from '../common/LoadingSpinner';

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { summary, topicProgress, loading } = useAppSelector((state: any) => state.progress);
  const { loading: topicsLoading } = useAppSelector((state: any) => state.topics);

  useEffect(() => {
    dispatch(fetchProgressSummary());
    dispatch(fetchTopics());
  }, [dispatch]);

  if (loading || topicsLoading) {
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

      {summary && (
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
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <TrendingUp color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6" component="h2">
                      CSE Learning Progress
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h3" color="primary">
                      {summary.overallCompletionPercentage}%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {summary.totalCompleted} of {summary.totalSubtopics} CS concepts mastered
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={summary.overallCompletionPercentage}
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
                  <Typography variant="h6" component="h2" gutterBottom>
                    Learning Analytics
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Box sx={{ flex: 1, textAlign: 'center' }}>
                      <CheckCircle color="success" sx={{ fontSize: 40, mb: 1 }} />
                      <Typography variant="h4" color="success.main">
                        {summary.totalCompleted}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Concepts Mastered
                      </Typography>
                    </Box>
                    <Box sx={{ flex: 1, textAlign: 'center' }}>
                      <Pending color="warning" sx={{ fontSize: 40, mb: 1 }} />
                      <Typography variant="h4" color="warning.main">
                        {summary.totalPending}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        In Progress
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Box>

          {/* Difficulty Progress */}
          <Card sx={{ 
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
          }}>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                Progress by Difficulty
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                <Box sx={{ flex: 1, textAlign: 'center' }}>
                  <Chip
                    label="Easy"
                    color="success"
                    sx={{ mb: 1 }}
                  />
                  <Typography variant="h5" color="success.main">
                    {summary.difficultyStats.easy}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={summary.difficultyStats.easy}
                    color="success"
                    sx={{ mt: 1 }}
                  />
                </Box>
                <Box sx={{ flex: 1, textAlign: 'center' }}>
                  <Chip
                    label="Medium"
                    color="warning"
                    sx={{ mb: 1 }}
                  />
                  <Typography variant="h5" color="warning.main">
                    {summary.difficultyStats.medium}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={summary.difficultyStats.medium}
                    color="warning"
                    sx={{ mt: 1 }}
                  />
                </Box>
                <Box sx={{ flex: 1, textAlign: 'center' }}>
                  <Chip
                    label="Hard"
                    color="error"
                    sx={{ mb: 1 }}
                  />
                  <Typography variant="h5" color="error.main">
                    {summary.difficultyStats.hard}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={summary.difficultyStats.hard}
                    color="error"
                    sx={{ mt: 1 }}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Topic Progress */}
          <Card sx={{ 
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Assignment color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" component="h2">
                  Topic Progress
                </Typography>
              </Box>
              {topicProgress.length === 0 ? (
                <Alert severity="info">
                  No topics available. Please check back later.
                </Alert>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 2 }}>
                  {topicProgress.map((topic: any) => (
                    <Paper
                      key={topic.topicId}
                      elevation={1}
                      sx={{
                        p: 2,
                        width: { xs: '100%', sm: 'calc(50% - 8px)', md: 'calc(33.333% - 11px)' },
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <Typography variant="h6" gutterBottom>
                        {topic.topicName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {topic.completedSubtopics} of {topic.totalSubtopics} completed
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={topic.completionPercentage}
                        sx={{ mb: 2 }}
                      />
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        <Chip
                          size="small"
                          label={`Easy: ${topic.difficultyProgress.easy.completed}/${topic.difficultyProgress.easy.total}`}
                          color="success"
                        />
                        <Chip
                          size="small"
                          label={`Medium: ${topic.difficultyProgress.medium.completed}/${topic.difficultyProgress.medium.total}`}
                          color="warning"
                        />
                        <Chip
                          size="small"
                          label={`Hard: ${topic.difficultyProgress.hard.completed}/${topic.difficultyProgress.hard.total}`}
                          color="error"
                        />
                      </Box>
                    </Paper>
                  ))}
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>
      )}
      </Container>
    </Box>
  );
};

export default Dashboard;
