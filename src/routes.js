import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Cart from './pages/Cart';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: '/cart',
                element: <Cart />,
            },
            {
                path: '*',
                element: <NotFound />,
            },
        ],
    },
]);

export default router;
