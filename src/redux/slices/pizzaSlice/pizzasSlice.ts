import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { IPizza } from 'types';

interface IRequestParam {
    categorySort: string;
    sortBy: string;
    currentPage: number;
    searchValue: string;
}

export const fetchPizzas = createAsyncThunk(
    'pizzas/fetchPizzas',
    async (
        { categorySort, sortBy, currentPage, searchValue }: IRequestParam,
        thunkAPI
    ) => {
        const { data } = await axios.get(
            `https://63c96cbcc3e2021b2d573b81.mockapi.io/items?page=${currentPage}&limit=4&sortBy=${sortBy}&order=asc&${categorySort}&search=${searchValue}`
        );

        return data as IPizza[];
    }
);

export enum Status {
    loading = 'loading',
    success = 'success',
    error = 'error',
}

export interface IPizzasSlice {
    items: IPizza[];
    status: Status;
}

const initialState: IPizzasSlice = {
    items: [],
    status: Status.loading,
};

const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizzas.pending, (state) => {
                state.status = Status.loading;
                state.items = [];
            })
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = Status.success;
            })
            .addCase(fetchPizzas.rejected, (state) => {
                state.status = Status.error;
                state.items = [];
            });
    },
});



const { actions, reducer } = pizzasSlice;

export default reducer;
