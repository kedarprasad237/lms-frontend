import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://lms-backend-a5xu.onrender.com/api';

// Types
interface ProgressEntry {
  topicId: string;
  subtopicId: string;
  status: 'pending' | 'done';
}

interface ProgressState {
  progress: ProgressEntry[];
  summary: {
    total: number;
    completed: number;
    pending: number;
    percentage: number;
  };
  loading: boolean;
  error: string | null;
}

const initialState: ProgressState = {
  progress: [],
  summary: {
    total: 0,
    completed: 0,
    pending: 0,
    percentage: 0,
  },
  loading: false,
  error: null,
};

// Async thunks
export const fetchProgress = createAsyncThunk(
  'progress/fetchProgress',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/progress/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch progress');
    }
  }
);

export const updateProgress = createAsyncThunk(
  'progress/updateProgress',
  async (
    { topicId, subtopicId, status }: { topicId: string; subtopicId: string; status: 'pending' | 'done' },
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${API_URL}/progress/update`,
        { topicId, subtopicId, status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update progress');
    }
  }
);

export const fetchProgressSummary = createAsyncThunk(
  'progress/fetchProgressSummary',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/progress/summary`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch progress summary');
    }
  }
);

// Slice
const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    clearProgress: (state) => {
      state.progress = [];
      state.summary = {
        total: 0,
        completed: 0,
        pending: 0,
        percentage: 0,
      };
      state.error = null;
    },
    updateLocalProgress: (state, action: PayloadAction<{ topicId: string; subtopicId: string; status: 'pending' | 'done' }>) => {
      const { topicId, subtopicId, status } = action.payload;
      const existingIndex = state.progress.findIndex(
        (p) => p.topicId === topicId && p.subtopicId === subtopicId
      );

      if (existingIndex !== -1) {
        state.progress[existingIndex].status = status;
      } else {
        state.progress.push({ topicId, subtopicId, status });
      }

      // Update summary
      const completed = state.progress.filter(p => p.status === 'done').length;
      const total = state.progress.length;
      state.summary = {
        total,
        completed,
        pending: total - completed,
        percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Progress
      .addCase(fetchProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProgress.fulfilled, (state, action) => {
        state.loading = false;
        state.progress = action.payload.progress || [];
        
        // Update summary
        const completed = state.progress.filter(p => p.status === 'done').length;
        const total = state.progress.length;
        state.summary = {
          total,
          completed,
          pending: total - completed,
          percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
        };
      })
      .addCase(fetchProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update Progress
      .addCase(updateProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProgress.fulfilled, (state, action) => {
        state.loading = false;
        state.progress = action.payload.progress || state.progress;
        
        // Update summary
        const completed = state.progress.filter(p => p.status === 'done').length;
        const total = state.progress.length;
        state.summary = {
          total,
          completed,
          pending: total - completed,
          percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
        };
      })
      .addCase(updateProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch Progress Summary
      .addCase(fetchProgressSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProgressSummary.fulfilled, (state, action) => {
        state.loading = false;
        const backendSummary = action.payload.summary;
        if (backendSummary) {
          state.summary = {
            total: backendSummary.totalSubtopics || 0,
            completed: backendSummary.totalCompleted || 0,
            pending: backendSummary.totalPending || 0,
            percentage: backendSummary.overallCompletionPercentage || 0,
          };
        }
      })
      .addCase(fetchProgressSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearProgress, updateLocalProgress } = progressSlice.actions;
export default progressSlice.reducer;
