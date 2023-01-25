import { configureStore } from '@reduxjs/toolkit';
import filters from './slices/filterSlice';
import cart from './slices/cartSlice';
import pizzas from './slices/pizzasSlice';

export const store = configureStore({
    reducer: { filters, cart, pizzas },
});
