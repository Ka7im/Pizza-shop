import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from 'react-router-dom';
import { lazy, Suspense } from 'react';
import App from './App';
import Home from './pages/Home';
import Spinner from 'components/Spinner';

const Cart = lazy(() => import('./pages/Cart'));
const NotFound = lazy(() => import('./pages/NotFound'));
const PizzaPage = lazy(() => import('./pages/PizzaPage'));

export const routes = createRoutesFromElements(
    <Route path='/' element={<App />}>
        <Route index element={<Home />} />
        <Route
            path='/cart'
            element={
                <Suspense fallback={<Spinner />}>
                    <Cart />
                </Suspense>
            }
        />
        <Route
            path='pizzas/:pizzaId'
            element={
                <Suspense fallback={<Spinner />}>
                    <PizzaPage />
                </Suspense>
            }
        />
        <Route
            path='*'
            element={
                <Suspense fallback={<Spinner />}>
                    <NotFound />
                </Suspense>
            }
        />
    </Route>
);

const Router = createBrowserRouter(routes);

// [
//     {
//         path: '/',
//         element: <App />,
//         children: [
//             {
//                 index: true,
//                 element: <Home />,
//             },
//             {
//                 path: '/cart',
//                 element: <Cart />,
//             },
//             {
//                 path: 'pizzas/:pizzaId',
//                 element: <PizzaPage />,
//             },
//             {
//                 path: '*',
//                 element: <NotFound />,
//             },
//         ],
//     },
// ]

export default Router;
