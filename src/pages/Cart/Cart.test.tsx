import cart from '../../redux/slices/cartSlice';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { renderWithReduxAndRouter } from 'test/helpers/renderWithReduxAndRouter';
import '@testing-library/jest-dom';
const sinon = require('sinon');

describe('test cart component', () => {
    test('increase pizza', async () => {
        const { store } = renderWithReduxAndRouter({
            reducer: { cart },
            initialRoute: ['/cart'],
            initialState: {
                cart: {
                    pizzas: [
                        {
                            id: 1,
                            imageUrl:
                                'https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/1e1a6e80-b3ba-4a44-b6b9-beae5b1fbf27.jpg',
                            price: 580,
                            title: 'Крэйзи пепперони',
                            type: 'тонкое',
                            size: 30,
                            count: 1,
                        },
                    ],
                    totalPrice: 580,
                    totalCount: 1,
                },
            },
        });

        userEvent.click(await screen.findByTestId('increase'));

        expect(store.getState().cart.totalCount).toBe(2);
        expect(store.getState().cart.totalPrice).toBe(1160);

        expect(screen.getByText('1160', { exact: false })).toBeInTheDocument();
    });

    test('decrease pizza', async () => {
        const { store } = renderWithReduxAndRouter({
            reducer: { cart },
            initialRoute: ['/cart'],
            initialState: {
                cart: {
                    pizzas: [
                        {
                            id: 1,
                            imageUrl:
                                'https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/1e1a6e80-b3ba-4a44-b6b9-beae5b1fbf27.jpg',
                            price: 580,
                            title: 'Крэйзи пепперони',
                            type: 'тонкое',
                            size: 30,
                            count: 2,
                        },
                    ],
                    totalPrice: 1160,
                    totalCount: 2,
                },
            },
        });

        userEvent.click(await screen.findByTestId('decrease'));

        expect(store.getState().cart.totalCount).toBe(1);
        expect(store.getState().cart.totalPrice).toBe(580);

        expect(screen.getAllByText(/580/)[1]).toBeInTheDocument();
    });

    test('delete pizza', async () => {
        const { store } = renderWithReduxAndRouter({
            reducer: { cart },
            initialRoute: ['/cart'],
            initialState: {
                cart: {
                    pizzas: [
                        {
                            id: 1,
                            imageUrl:
                                'https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/1e1a6e80-b3ba-4a44-b6b9-beae5b1fbf27.jpg',
                            price: 580,
                            title: 'Крэйзи пепперони',
                            type: 'тонкое',
                            size: 30,
                            count: 1,
                        },
                    ],
                    totalPrice: 580,
                    totalCount: 1,
                },
            },
        });

        const confirmStub = sinon.stub(global, 'confirm');
        confirmStub.returns(true);

        userEvent.click(await screen.findByTestId('delete'));

        expect(store.getState().cart.totalPrice).toBe(0);
    });

    test('delete all pizzas', async () => {
        const { store } = renderWithReduxAndRouter({
            reducer: { cart },
            initialRoute: ['/cart'],
            initialState: {
                cart: {
                    pizzas: [
                        {
                            id: 1,
                            imageUrl:
                                'https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/1e1a6e80-b3ba-4a44-b6b9-beae5b1fbf27.jpg',
                            price: 580,
                            title: 'Крэйзи пепперони',
                            type: 'тонкое',
                            size: 30,
                            count: 1,
                        },
                        {
                            id: 2,
                            imageUrl:
                                'https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/af553bf5-3887-4501-b88e-8f0f55229429.jpg',
                            price: 275,
                            title: 'Кисло-сладкий цыпленок',
                            type: 'традиционное',
                            size: 26,
                            count: 1,
                        },
                    ],
                    totalPrice: 580,
                    totalCount: 1,
                },
            },
        });

        userEvent.click(screen.getByTestId('delete-all'));

        expect(store.getState().cart.totalPrice).toBe(0);
        expect(store.getState().cart.pizzas).toEqual([]);

        expect(await screen.findByText(/корзина пустая/i)).toBeInTheDocument();
    });
});
