import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export interface Subtopic {
  _id: string;
  name: string;
  leetCodeLink: string;
  youtubeLink: string;
  articleLink: string;
  level: 'easy' | 'medium' | 'hard';
}

export interface Topic {
  _id: string;
  name: string;
  description: string;
  subtopics: Subtopic[];
  order: number;
}

interface TopicState {
  topics: Topic[];
  loading: boolean;
  error: string | null;
}

const initialState: TopicState = {
  topics: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchTopics = createAsyncThunk(
  'topics/fetchTopics',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/topics`);
      return response.data.topics;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch topics');
    }
  }
);

export const fetchTopic = createAsyncThunk(
  'topics/fetchTopic',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/topics/${id}`);
      return response.data.topic;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch topic');
    }
  }
);

const topicSlice = createSlice({
  name: 'topics',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Topics
      .addCase(fetchTopics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopics.fulfilled, (state, action) => {
        state.loading = false;
        state.topics = action.payload;
      })
      .addCase(fetchTopics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch Single Topic
      .addCase(fetchTopic.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopic.fulfilled, (state, action) => {
        state.loading = false;
        const existingIndex = state.topics.findIndex(topic => topic._id === action.payload._id);
        if (existingIndex >= 0) {
          state.topics[existingIndex] = action.payload;
        } else {
          state.topics.push(action.payload);
        }
      })
      .addCase(fetchTopic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = topicSlice.actions;
export default topicSlice.reducer;


