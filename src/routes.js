import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Cart from './pages/Cart';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import PizzaPage from './pages/PizzaPage';

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
                path: 'pizzas/:pizzaId',
                element: <PizzaPage />,
            },
            {
                path: '*',
                element: <NotFound />,
            },
        ],
    },
]);

export default router;
