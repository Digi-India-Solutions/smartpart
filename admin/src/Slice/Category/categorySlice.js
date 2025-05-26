// src/features/category/categorySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getData, postData } from '../../services/FetchNodeServices';

// Thunks
export const addCategory = createAsyncThunk('category/addCategory', async (formData, { rejectWithValue }) => {
  try {
    const response = await postData('category/create-categoey', formData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});


export const fetchCategories = createAsyncThunk('category/fetchCategories', async (_, { rejectWithValue }) => {
  try {
    const response = await getData('category/get-all-categorys');
    return response.data
    // .reverse()
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const updateCategoryField = createAsyncThunk('category/change-category-status', async ({ id, field, value }, { rejectWithValue }) => {
  try {
    const response = await postData(`category/change-category-status/${id}`, { [field]: value });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Update failed');
  }
});


export const fetchCategory = createAsyncThunk('category/fetchCategory', async (id, { rejectWithValue }) => {
  try {
    const response = await getData(`category/get-category-by-id/${id}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});


export const updateCategory = createAsyncThunk('category/updateCategory', async ({ id, formData }, { rejectWithValue }) => {
  try {
    const response = await postData(`category/update-category/${id}`, formData);
    console.log("CCCCCCCCCCCCCCCCCCCCCC:-", response)
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const deleteCategory = createAsyncThunk('category/deleteCategory', async (id, { rejectWithValue }) => {
  try {
    const response = await getData(`category/delete-category/${id}`);
    return { id, status: response.status };
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Slice
const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: [],
    category: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.map((category) =>
          category._id === action.payload._id ? action.payload : category
        );
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter((category) => category._id !== action.payload.id);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;
