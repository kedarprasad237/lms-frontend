import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Chip,
  Tooltip,
  LinearProgress,
  Alert,
  Card,
  CardContent,
  Stack,
  Badge,
} from '@mui/material';
import {
  ExpandMore,
  CheckCircle,
  Pending,
  PlayArrow,
  Article,
  Code,
  Star,
  School,
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchTopics } from '../../store/slices/topicSlice';
import { fetchProgress, updateProgress } from '../../store/slices/progressSlice';
import LoadingSpinner from '../common/LoadingSpinner';

const Topics: React.FC = () => {
  const dispatch = useAppDispatch();
  const { topics } = useAppSelector((state: any) => state.topics);
  const { progress } = useAppSelector((state: any) => state.progress);
  const [updatingProgress, setUpdatingProgress] = useState<string | null>(null);
  const [localProgress, setLocalProgress] = useState<Array<{topicId: string, subtopicId: string, status: string}>>([]);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setInitialLoading(true);
      try {
        await Promise.all([
          dispatch(fetchTopics()),
          dispatch(fetchProgress())
        ]);
      } finally {
        setInitialLoading(false);
      }
    };
    loadData();
  }, [dispatch]);

  // Sync local progress with Redux progress
  useEffect(() => {
    if (progress && progress.length > 0) {
      setLocalProgress(progress);
    }
  }, [progress]);

  const handleProgressUpdate = async (event: React.MouseEvent, topicId: string, subtopicId: string, currentStatus: string) => {
    event.preventDefault();
    event.stopPropagation();
    
    const progressKey = `${topicId}-${subtopicId}`;
    if (updatingProgress === progressKey) return; // Prevent multiple clicks
    
    try {
      setUpdatingProgress(progressKey);
      const newStatus = currentStatus === 'done' ? 'pending' : 'done';
      
      // Update local state immediately for instant UI feedback
      setLocalProgress(prev => {
        const existingIndex = prev.findIndex(p => p.topicId === topicId && p.subtopicId === subtopicId);
        if (existingIndex !== -1) {
          const updated = [...prev];
          updated[existingIndex] = { ...updated[existingIndex], status: newStatus };
          return updated;
        } else {
          return [...prev, { topicId, subtopicId, status: newStatus }];
        }
      });
      
      // Then sync with backend in the background
      setTimeout(async () => {
        try {
          await dispatch(updateProgress({ topicId, subtopicId, status: newStatus }));
        } catch (error) {
          console.error('Error syncing with backend:', error);
          // Revert local state if backend update fails
          setLocalProgress(prev => {
            const existingIndex = prev.findIndex(p => p.topicId === topicId && p.subtopicId === subtopicId);
            if (existingIndex !== -1) {
              const updated = [...prev];
              updated[existingIndex] = { ...updated[existingIndex], status: currentStatus };
              return updated;
            }
            return prev;
          });
        } finally {
          setUpdatingProgress(null);
        }
      }, 100);
      
    } catch (error) {
      console.error('Error updating progress:', error);
      setUpdatingProgress(null);
    }
  };

  const getProgressStatus = (topicId: string, subtopicId: string) => {
    const progressEntry = localProgress.find(
      (p) => p.topicId === topicId && p.subtopicId === subtopicId
    );
    return progressEntry?.status || 'pending';
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'easy':
        return 'success';
      case 'medium':
        return 'warning';
      case 'hard':
        return 'error';
      default:
        return 'default';
    }
  };

  const getTopicProgress = (topicId: string) => {
    const topicProgress = progress.filter((p: any) => p.topicId === topicId);
    const completed = topicProgress.filter((p: any) => p.status === 'done').length;
    const total = topics.find((t: any) => t._id === topicId)?.subtopics.length || 0;
    return { completed, total, percentage: total > 0 ? (completed / total) * 100 : 0 };
  };

  if (initialLoading) {
    return <LoadingSpinner message="Loading topics and progress..." />;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header Section */}
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ 
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          DSA Learning Path
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
          Master Data Structures and Algorithms through structured learning paths. 
          Track your progress and unlock your coding potential! 🚀
        </Typography>
      </Box>

      {topics.length === 0 ? (
        <Alert severity="info" sx={{ borderRadius: 2, p: 3 }}>
          <Typography variant="h6">No topics available</Typography>
          <Typography>Please check back later or contact support if this persists.</Typography>
        </Alert>
      ) : (
        <Box>
          {topics.map((topic: any, index: number) => {
            const topicProgress = getTopicProgress(topic._id);
            const isCompleted = topicProgress.percentage === 100;
            
            return (
              <Card 
                key={topic._id} 
                sx={{ 
                  mb: 3, 
                  borderRadius: 3,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                  border: '1px solid rgba(0,0,0,0.05)',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                  }
                }}
              >
                <Accordion sx={{ boxShadow: 'none' }}>
                  <AccordionSummary
                    expandIcon={<ExpandMore sx={{ color: 'white' }} />}
                    sx={{
                      background: isCompleted 
                        ? 'linear-gradient(135deg, #4caf50, #66bb6a)'
                        : 'linear-gradient(135deg, #1976d2, #42a5f5)',
                      color: 'white',
                      minHeight: 80,
                      '&:hover': {
                        background: isCompleted 
                          ? 'linear-gradient(135deg, #388e3c, #4caf50)'
                          : 'linear-gradient(135deg, #1565c0, #1976d2)',
                      },
                      '& .MuiAccordionSummary-content': {
                        alignItems: 'center',
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', pr: 2 }}>
                      {/* Topic Icon */}
                      <Box sx={{ 
                        mr: 3, 
                        p: 2, 
                        borderRadius: '50%', 
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <School sx={{ fontSize: 32 }} />
                      </Box>
                      
                      {/* Topic Info */}
                      <Box sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                          <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                            {topic.name}
                          </Typography>
                          {isCompleted && (
                            <Badge badgeContent={<CheckCircle sx={{ fontSize: 16 }} />} color="success">
                              <Star sx={{ color: '#ffd700' }} />
                            </Badge>
                          )}
                        </Box>
                        <Typography variant="body1" sx={{ opacity: 0.9, mb: 2 }}>
                          {topic.description}
                        </Typography>
                        
                        {/* Progress Bar */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Typography variant="body2" sx={{ opacity: 0.9, fontWeight: 'bold' }}>
                            Progress: {topicProgress.completed}/{topicProgress.total}
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={topicProgress.percentage}
                            sx={{
                              flexGrow: 1,
                              height: 8,
                              borderRadius: 4,
                              backgroundColor: 'rgba(255,255,255,0.3)',
                              '& .MuiLinearProgress-bar': {
                                backgroundColor: 'white',
                                borderRadius: 4,
                              },
                            }}
                          />
                          <Typography variant="body2" sx={{ opacity: 0.9, fontWeight: 'bold', minWidth: 40 }}>
                            {topicProgress.percentage}%
                          </Typography>
                        </Box>
                      </Box>

                    </Box>
                  </AccordionSummary>
                  
                  <AccordionDetails sx={{ p: 0 }}>
                    <Box sx={{ p: 3, backgroundColor: '#fafafa' }}>
                      <Typography variant="h6" gutterBottom sx={{ mb: 3, color: 'text.primary' }}>
                        📚 Subtopics & Resources
                      </Typography>
                      
                      <Stack spacing={2}>
                        {topic.subtopics.map((subtopic: any, subIndex: number) => {
                          const status = getProgressStatus(topic._id, subtopic._id);
                          const isCompleted = status === 'done';
                          const progressKey = `${topic._id}-${subtopic._id}`;
                          const isUpdating = updatingProgress === progressKey;

                          return (
                            <Card 
                              key={subtopic._id}
                              onClick={(e) => e.stopPropagation()}
                              sx={{
                                border: isCompleted ? '2px solid #4caf50' : '1px solid #e0e0e0',
                                borderRadius: 2,
                                backgroundColor: isCompleted ? '#f1f8e9' : 'white',
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                  transform: 'translateY(-1px)',
                                }
                              }}
                            >
                              <CardContent sx={{ p: 2 }}>
                                {/* Main Row: Checkbox + Text + Resource Buttons */}
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
                                  {/* Left Side: Checkbox + Text + Chips */}
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}>
                                    {/* Simple Checkbox */}
                                    <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                                      <Box
                                        onClick={(e) => {
                                          e.preventDefault();
                                          e.stopPropagation();
                                          handleProgressUpdate(e, topic._id, subtopic._id, status);
                                        }}
                                        sx={{
                                          cursor: isUpdating ? 'not-allowed' : 'pointer',
                                          opacity: isUpdating ? 0.7 : 1,
                                          transition: 'all 0.2s ease',
                                          '&:hover': {
                                            opacity: 0.8,
                                          }
                                        }}
                                      >
                                        <Box sx={{
                                          width: 20,
                                          height: 20,
                                          borderRadius: 0.5,
                                          border: isCompleted ? 'none' : '2px solid #666',
                                          backgroundColor: isCompleted ? '#4caf50' : 'transparent',
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          transition: 'all 0.2s ease',
                                          '&:hover': {
                                            borderColor: isCompleted ? '#4caf50' : '#333',
                                            backgroundColor: isCompleted ? '#4caf50' : '#f5f5f5',
                                          }
                                        }}>
                                          {isCompleted && <CheckCircle sx={{ fontSize: 14, color: 'white' }} />}
                                        </Box>
                                      </Box>
                                    </Box>

                                    {/* Subtopic Details */}
                                    <Box sx={{ flexGrow: 1 }}>
                                      <Typography 
                                        variant="h6" 
                                        sx={{ 
                                          fontWeight: 'bold',
                                          color: isCompleted ? '#2e7d32' : 'text.primary',
                                          mb: 0.5,
                                          fontSize: '1.1rem'
                                        }}
                                      >
                                        {subtopic.name}
                                      </Typography>
                                      
                                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                                        <Chip
                                          label={subtopic.level.toUpperCase()}
                                          color={getDifficultyColor(subtopic.level) as any}
                                          size="small"
                                          sx={{ 
                                            fontWeight: 'bold',
                                            backgroundColor: isCompleted ? '#4caf50' : undefined,
                                            color: isCompleted ? 'white' : undefined
                                          }}
                                        />
                                        <Chip
                                          label={isCompleted ? 'Done' : 'Pending'}
                                          color={isCompleted ? 'success' : 'default'}
                                          variant={isCompleted ? 'filled' : 'outlined'}
                                          size="small"
                                          sx={{ 
                                            fontWeight: 'bold',
                                            backgroundColor: isCompleted ? '#e8f5e8' : undefined,
                                            color: isCompleted ? '#2e7d32' : undefined,
                                            borderColor: isCompleted ? '#4caf50' : undefined
                                          }}
                                          icon={isCompleted ? <CheckCircle sx={{ fontSize: 14 }} /> : <Pending sx={{ fontSize: 14 }} />}
                                        />
                                      </Box>
                                    </Box>
                                  </Box>

                                  {/* Right Side: Resource Buttons */}
                                  <Box sx={{ display: 'flex', gap: 1, flexShrink: 0 }}>
                                    {subtopic.leetCodeLink && (
                                      <Tooltip title="Practice on LeetCode">
                                        <Button
                                          variant="outlined"
                                          size="small"
                                          startIcon={<Code />}
                                          onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            window.open(subtopic.leetCodeLink, '_blank', 'noopener,noreferrer');
                                          }}
                                          sx={{ 
                                            borderRadius: 2,
                                            textTransform: 'none',
                                            fontWeight: 'bold'
                                          }}
                                        >
                                          Practice
                                        </Button>
                                      </Tooltip>
                                    )}
                                    
                                    {subtopic.youtubeLink && (
                                      <Tooltip title="Watch Tutorial">
                                        <Button
                                          variant="outlined"
                                          size="small"
                                          startIcon={<PlayArrow />}
                                          onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            window.open(subtopic.youtubeLink, '_blank', 'noopener,noreferrer');
                                          }}
                                          sx={{ 
                                            borderRadius: 2,
                                            textTransform: 'none',
                                            fontWeight: 'bold'
                                          }}
                                        >
                                          Watch
                                        </Button>
                                      </Tooltip>
                                    )}
                                    
                                    {subtopic.articleLink && (
                                      <Tooltip title="Read Article">
                                        <Button
                                          variant="outlined"
                                          size="small"
                                          startIcon={<Article />}
                                          onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            window.open(subtopic.articleLink, '_blank', 'noopener,noreferrer');
                                          }}
                                          sx={{ 
                                            borderRadius: 2,
                                            textTransform: 'none',
                                            fontWeight: 'bold'
                                          }}
                                        >
                                          Read
                                        </Button>
                                      </Tooltip>
                                    )}
                                  </Box>
                                </Box>
                              </CardContent>
                            </Card>
                          );
                        })}
                      </Stack>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </Card>
            );
          })}
        </Box>
      )}
    </Container>
  );
};

export default Topics;
