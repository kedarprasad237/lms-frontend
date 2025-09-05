import React, { useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  Paper,
  Divider,
} from '@mui/material';
import {
  TrendingUp,
  CheckCircle,
  Pending,
  Assignment,
  School,
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchProgressSummary, fetchProgress } from '../../store/slices/progressSlice';
import { fetchTopics } from '../../store/slices/topicSlice';
import LoadingSpinner from '../common/LoadingSpinner';

const Progress: React.FC = () => {
  const dispatch = useAppDispatch();
  const { summary, progress, loading, error } = useAppSelector((state: any) => state.progress);
  const { topics, loading: topicsLoading, error: topicsError } = useAppSelector((state: any) => state.topics);
  const { user, token } = useAppSelector((state: any) => state.auth);

  useEffect(() => {
    // Only fetch data if user is authenticated
    if (token && user) {
      dispatch(fetchProgressSummary());
      dispatch(fetchProgress());
      dispatch(fetchTopics());
    }
  }, [dispatch, token, user]);

  // Show error if there's an authentication issue
  if (!token || !user) {
    return (
      <Box sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <Card sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" color="error">
            Please log in to view your progress
          </Typography>
        </Card>
      </Box>
    );
  }

  if (loading || topicsLoading) {
    return <LoadingSpinner message="Loading your progress..." />;
  }

  // Show error if API calls failed
  if (error || topicsError) {
    return (
      <Box sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <Card sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" color="error">
            Error loading progress: {error || topicsError}
          </Typography>
        </Card>
      </Box>
    );
  }

  // Safety check for summary
  if (!summary) {
    return <LoadingSpinner message="Loading your progress..." />;
  }

  // Calculate topic-wise progress
  const getTopicProgress = (topicId: string) => {
    const topicProgress = progress.filter((p: any) => p.topicId === topicId);
    const completed = topicProgress.filter((p: any) => p.status === 'done').length;
    return { completed, total: topicProgress.length };
  };

  const getDifficultyIcon = (level: string) => {
    switch (level) {
      case 'easy': return <CheckCircle color="success" />;
      case 'medium': return <Pending color="warning" />;
      case 'hard': return <Assignment color="error" />;
      default: return <School />;
    }
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'easy': return 'success';
      case 'medium': return 'warning';
      case 'hard': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <Container maxWidth="lg" sx={{ pt: 4, pb: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4, textAlign: 'center', color: 'white' }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Your Learning Progress
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            Track your journey through Data Structures and Algorithms
          </Typography>
        </Box>

        {/* Overall Progress Card */}
        <Card sx={{ 
          mb: 4,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
        }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <TrendingUp color="primary" sx={{ mr: 2, fontSize: 40 }} />
              <Box>
                <Typography variant="h4" component="h2" gutterBottom>
                  Overall Progress
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {summary.completed || 0} of {summary.total || 0} concepts mastered
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="h2" color="primary">
                  {summary.percentage || 0}%
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Chip
                    icon={<CheckCircle />}
                    label={`${summary.completed || 0} Completed`}
                    color="success"
                    variant="outlined"
                  />
                  <Chip
                    icon={<Pending />}
                    label={`${summary.pending || 0} Pending`}
                    color="warning"
                    variant="outlined"
                  />
                </Box>
              </Box>
              <LinearProgress
                variant="determinate"
                value={summary.percentage || 0}
                sx={{ height: 12, borderRadius: 6 }}
              />
            </Box>
          </CardContent>
        </Card>

        {/* Topics Progress */}
        <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'white', mb: 3 }}>
          Progress by Topic
        </Typography>
        
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { 
            xs: '1fr', 
            md: 'repeat(2, 1fr)', 
            lg: 'repeat(3, 1fr)' 
          }, 
          gap: 3 
        }}>
          {topics && topics.map((topic: any) => {
            const topicProgress = getTopicProgress(topic._id);
            const completionPercentage = topicProgress.total > 0 
              ? Math.round((topicProgress.completed / topicProgress.total) * 100) 
              : 0;

            return (
              <Box key={topic._id}>
                <Card sx={{ 
                  height: '100%',
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  }
                }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      {getDifficultyIcon('easy')}
                      <Typography variant="h6" component="h3" sx={{ ml: 1, fontWeight: 'bold' }}>
                        {topic.name}
                      </Typography>
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {topic.description}
                    </Typography>
                    
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          Progress: {topicProgress.completed}/{topicProgress.total}
                        </Typography>
                        <Typography variant="body2" color="primary" sx={{ fontWeight: 'bold' }}>
                          {completionPercentage}%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={completionPercentage}
                        color="primary"
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    {/* Subtopic Progress */}
                    <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold' }}>
                      Subtopics:
                    </Typography>
                    <Box sx={{ maxHeight: 200, overflowY: 'auto' }}>
                      {topic.subtopics && topic.subtopics.map((subtopic: any) => {
                        const subtopicProgress = progress.find((p: any) => 
                          p.topicId === topic._id && p.subtopicId === subtopic._id
                        );
                        const isCompleted = subtopicProgress?.status === 'done';

                        return (
                          <Paper
                            key={subtopic._id}
                            elevation={0}
                            sx={{
                              p: 1.5,
                              mb: 1,
                              bgcolor: isCompleted ? 'rgba(76, 175, 80, 0.08)' : 'grey.50',
                              border: isCompleted ? '1px solid' : '1px solid transparent',
                              borderColor: isCompleted ? 'rgba(76, 175, 80, 0.3)' : 'transparent',
                              transition: 'all 0.2s ease-in-out',
                              '&:hover': {
                                bgcolor: isCompleted ? 'rgba(76, 175, 80, 0.12)' : 'grey.100',
                              }
                            }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                {isCompleted ? (
                                  <CheckCircle color="success" sx={{ fontSize: 20 }} />
                                ) : (
                                  <Pending color="action" sx={{ fontSize: 20 }} />
                                )}
                                <Typography 
                                  variant="body2" 
                                  sx={{ 
                                    fontWeight: isCompleted ? '600' : 'normal',
                                    color: isCompleted ? 'rgba(76, 175, 80, 0.8)' : 'text.primary'
                                  }}
                                >
                                  {subtopic.name}
                                </Typography>
                              </Box>
                              <Chip
                                label={subtopic.level.toUpperCase()}
                                color={getDifficultyColor(subtopic.level) as any}
                                size="small"
                                variant="outlined"
                              />
                            </Box>
                          </Paper>
                        );
                      })}
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            );
          })}
        </Box>

        {/* Learning Statistics */}
        <Card sx={{ 
          mt: 4,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
        }}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom sx={{ textAlign: 'center', mb: 3 }}>
              Learning Statistics
            </Typography>
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { 
                xs: '1fr', 
                sm: 'repeat(3, 1fr)' 
              }, 
              gap: 3 
            }}>
              <Box sx={{ textAlign: 'center' }}>
                <School color="primary" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold' }}>
                  {topics?.length || 0}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Topics Available
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <CheckCircle color="success" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h4" color="success.main" sx={{ fontWeight: 'bold' }}>
                  {summary.completed || 0}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Concepts Mastered
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <TrendingUp color="warning" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h4" color="warning.main" sx={{ fontWeight: 'bold' }}>
                  {summary.percentage || 0}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Overall Progress
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Progress;
