import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../util/axios";

const getStoredToken = () => localStorage.getItem("token");

const saveToken = (token) => {
  if (token) {
    localStorage.setItem("token", token);
  } else {
    localStorage.removeItem("token");
  }
};

export const register = createAsyncThunk(
  "auth/register",
  async (newUser, thunkAPI) => {
    try {
      const result = await api.post("/auth/register", newUser);
      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.errors ||
          error.message ||
          "Registration failed"
      );
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const result = await api.post("/auth/login", credentials);
      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.errors ||
          error.message ||
          "Login failed"
      );
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState()?.auth?.token || getStoredToken();
      if (!token) {
        return thunkAPI.rejectWithValue("No token found");
      }

      const result = await api.get("/auth/current", {
        headers: {
          Authorization: token,
        },
      });

      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || "Failed to fetch current user"
      );
    }
  }
);

const initialState = {
  user: null,
  token: getStoredToken(),
  loading: false,
  error: null,
  success: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.success = "Logged out successfully";
      saveToken(null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload?.message || "User registered successfully";
        state.user = action.payload?.user || null;
        state.token = action.payload?.token || null;
        state.error = null;
        saveToken(state.token);
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.token = null;
        saveToken(null);
        state.error = action.payload || "Registration failed";
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload?.message || "Login successful";
        state.user = action.payload?.user || null;
        state.token = action.payload?.token || null;
        state.error = null;
        saveToken(state.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.token = null;
        saveToken(null);
        state.error = action.payload || "Login failed";
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload || null;
        state.error = null;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch current user";
      });
  },
});

export const { clearError, clearSuccess, logout } = authSlice.actions;
export default authSlice.reducer;