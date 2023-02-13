import { render } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { routes } from '../../routes';

export const renderWithRouter = (initialRoute = ['/']) => {
    const router = createMemoryRouter(routes, {
        initialEntries: initialRoute,
    });

    return {
        ...render(<RouterProvider router={router} />),
    };
};
