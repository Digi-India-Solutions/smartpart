// src/features/brandCategory/brandCategorySlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getData, postData } from '../../services/FetchNodeServices';

// Thunks

export const addBrandCategory = createAsyncThunk('brandCategory/create-brand-category', async (formData, { rejectWithValue }) => {
    try {
        const response = await postData('brandCategory/create-brand-category', formData); // adjust endpoint
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to add brand category");
    }
});


export const fetchBrandCategories = createAsyncThunk('brandCategory/fetchAll', async (_, { rejectWithValue }) => {
    try {
        const response = await getData('brand-category/list'); // adjust endpoint
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to fetch brand categories");
    }
});

export const fetchBrandCategory = createAsyncThunk('brandCategory/fetchSingle', async (id, { rejectWithValue }) => {
    try {
        const response = await getData(`brand-category/${id}`); // adjust endpoint
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to fetch brand category");
    }
});

export const updateBrandCategory = createAsyncThunk('brandCategory/update', async ({ id, formData }, { rejectWithValue }) => {
    try {
        const response = await postData(`brand-category/update/${id}`, formData); // adjust endpoint
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to update brand category");
    }
});

export const deleteBrandCategory = createAsyncThunk('brandCategory/delete', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`http://localhost:8000/api/brand-category/${id}`);
        return { id, status: response.status };
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to delete brand category");
    }
});

export const toggleBrandCategoryField = createAsyncThunk(
    'brandCategory/toggleField',
    async ({ id, field, value }, { rejectWithValue }) => {
        try {
            const response = await postData(`brand-category/toggle-field/${id}`, { [field]: value }); // adjust endpoint
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to toggle field");
        }
    }
);

// Slice
const brandCategorySlice = createSlice({
    name: 'brandCategory',
    initialState: {
        brandCategories: [],
        brandCategory: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch all
            .addCase(fetchBrandCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBrandCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.brandCategories = action.payload;
            })
            .addCase(fetchBrandCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Fetch one
            .addCase(fetchBrandCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBrandCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.brandCategory = action.payload;
            })
            .addCase(fetchBrandCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Add
            .addCase(addBrandCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(addBrandCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.brandCategories.push(action.payload);
            })
            .addCase(addBrandCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Update
            .addCase(updateBrandCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateBrandCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.brandCategories = state.brandCategories.map((item) =>
                    item._id === action.payload._id ? action.payload : item
                );
            })
            .addCase(updateBrandCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Delete
            .addCase(deleteBrandCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteBrandCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.brandCategories = state.brandCategories.filter(
                    (item) => item._id !== action.payload.id
                );
            })
            .addCase(deleteBrandCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Toggle field
            .addCase(toggleBrandCategoryField.fulfilled, (state, action) => {
                state.brandCategories = state.brandCategories.map((item) =>
                    item._id === action.payload._id ? action.payload : item
                );
            });
    },
});

export default brandCategorySlice.reducer;
