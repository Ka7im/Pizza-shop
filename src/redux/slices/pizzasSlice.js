import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
    'pizzas/fetchPizzas',
    async ({ categorySort, sortBy, currentPage, searchValue }, thunkAPI) => {
        const { data } = await axios.get(
            `https://63c96cbcc3e2021b2d573b81.mockapi.io/items?page=${currentPage}&limit=4&sortBy=${sortBy}&order=asc&${categorySort}&search=${searchValue}`
        );

        return data;
    }
);

const initialState = {
    items: [],
    status: 'loading', //loading | success | error
};

const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload;
        },
    },
    extraReducers: {
        [fetchPizzas.pending]: (state) => {
            state.status = 'loading';
            state.items = [];
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.status = 'success';
        },
        [fetchPizzas.rejected]: (state, action) => {
            state.status = 'error';
            state.items = [];
        },
    },
});

const { actions, reducer } = pizzasSlice;

export default reducer;

export const { setItems } = actions;
