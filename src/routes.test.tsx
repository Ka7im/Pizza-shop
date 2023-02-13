import { screen } from '@testing-library/react';
import { renderWithReduxAndRouter } from 'test/helpers/renderWithReduxAndRouter';
import filters from './redux/slices/filterSlice';
import pizzas from './redux/slices/pizzaSlice/pizzasSlice';
import cart from './redux/slices/cartSlice';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
jest.mock('axios');

describe('routes test', () => {
    beforeEach(() => {
        (axios.get as jest.Mock).mockResolvedValue({
            data: [
                {
                    id: '3',
                    imageUrl:
                        'https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/af553bf5-3887-4501-b88e-8f0f55229429.jpg',
                    title: 'Кисло-сладкий цыпленок',
                    price: 275,
                    category: 2,
                    rating: 2,
                    types: [2],
                    sizes: [26, 30, 40],
                },
            ],
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('test redirect to pizza page', async () => {
        renderWithReduxAndRouter({
            reducer: { pizzas, filters, cart },
            initialRoute: ['/'],
        });

        expect(screen.getByText('Все пиццы')).toBeInTheDocument();

        userEvent.click(
            (await screen.findAllByTestId('link-to-pizza-page'))[0]
        );

        expect(await screen.findByTestId('pizza-page')).toBeInTheDocument();
    });

    test('test redirect to cart page', async () => {
        renderWithReduxAndRouter({
            reducer: { pizzas, filters, cart },
            initialRoute: ['/'],
        });

        expect(screen.getByText('Все пиццы')).toBeInTheDocument();

        userEvent.click((await screen.findAllByTestId('link-to-cart-page'))[0]);

        expect(await screen.findByTestId('cart-empty')).toBeInTheDocument();
    });

    test('test redirect to not found page', async () => {
        renderWithReduxAndRouter({
            reducer: { pizzas, filters, cart },
            initialRoute: ['/notfound'],
        });

        expect(
            await screen.findByText('Ничего не найдено')
        ).toBeInTheDocument();
    });
});
