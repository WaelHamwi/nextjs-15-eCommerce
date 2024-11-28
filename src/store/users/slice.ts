import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UserState,initialState } from '@/types/users';
export const fetchUser = createAsyncThunk<
  { name: string; email: string }, 
  void, 
  { rejectValue: string } 
>('user/fetchUser', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch('/api/auth/user');
    if (!response.ok) {
      throw new Error('Failed to fetch user from session');
    }
    const data = await response.json();
    return data.user; 
  } catch (error: any) {
    return rejectWithValue(error.message || 'Unknown error');
  }
});



const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearUser(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.payload || 'An error occurred'; 
        state.loading = false;
      });
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
