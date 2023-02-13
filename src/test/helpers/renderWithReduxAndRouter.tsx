import { AnyAction, configureStore, Reducer } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { routes } from '../../routes';

interface IOptions {
    reducer: { [k: string]: Reducer<any, AnyAction> };
    initialRoute: string[];
    initialState?: any;
}

export function renderWithReduxAndRouter(options: IOptions) {
    const store = configureStore({
        reducer: options?.reducer,
        preloadedState: options.initialState,
    });

    const router = createMemoryRouter(routes, {
        initialEntries: options?.initialRoute,
    });

    return {
        ...render(
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        ),
        store,
    };
}
