import {
    AnyAction,
    configureStore,
    Reducer,
    ReducersMapObject,
} from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ICartSlice } from 'redux/slices/cartSlice';
import { IFilterSlice } from 'redux/slices/filterSlice';
import { IPizzasSlice } from 'redux/slices/pizzaSlice/pizzasSlice';

export const renderWithRedux = (
    reducers: Reducer<any, AnyAction>,
    component: JSX.Element,
    initialState: {
        filters?: IFilterSlice;
        cart?: ICartSlice;
        pizzas?: IPizzasSlice;
    }
) => {
    const store = configureStore({
        reducer: reducers,
        preloadedState: initialState,
    });

    return {
        ...render(<Provider store={store}>{component}</Provider>),
        store,
    };
};
