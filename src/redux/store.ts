import { configureStore } from '@reduxjs/toolkit';
import filters from './slices/filterSlice';
import cart from './slices/cartSlice';
import pizzas from './slices/pizzaSlice/pizzasSlice';

export const store = configureStore({
    reducer: { filters, cart, pizzas },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
