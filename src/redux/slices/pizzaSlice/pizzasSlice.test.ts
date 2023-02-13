import pizzasSliceReducer, { fetchPizzas, Status } from './pizzasSlice';

describe('Pizza Slice Reducer', () => {
    test('fetchPizzas.pending', () => {
        expect(
            pizzasSliceReducer(
                { items: [], status: Status.loading },
                fetchPizzas.pending
            )
        ).toEqual({
            status: Status.loading,
            items: [],
        });
    });

    test('fetchPizzas.fulfilled', () => {
        expect(
            pizzasSliceReducer(
                { items: [], status: Status.loading },
                {
                    type: fetchPizzas.fulfilled,
                    payload: [
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
                }
            )
        ).toEqual({
            items: [
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
            status: Status.success,
        });
    });

    test('fetchPizzas.rejected', () => {
        expect(
            pizzasSliceReducer(
                { items: [], status: Status.loading },
                fetchPizzas.rejected
            )
        ).toEqual({ status: Status.error, items: [] });
    });
});
