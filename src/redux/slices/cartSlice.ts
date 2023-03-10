import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICartPizza } from 'types';
import { getCartFromLS } from 'utils/getCartFromLS';

export interface ICartSlice {
    pizzas: ICartPizza[];
    totalPrice: number;
    totalCount: number;
}

const localStorageData = getCartFromLS();

const initialState: ICartSlice = {
    pizzas: localStorageData?.pizzas || [],
    totalPrice: localStorageData?.totalPrice || 0,
    totalCount: localStorageData?.totalCount || 0,
};

const counter = (count = 0) => {
    return () => {
        return count++;
    };
};

const id = counter(1);

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addPizza: (state, action: PayloadAction<Omit<ICartPizza, 'id'>>) => {
            const newPizza = action.payload;
            let isNewPizza = true;

            if (state.pizzas.length === 0) {
                state.pizzas.push({ id: id(), ...newPizza });
            } else {
                state.pizzas.forEach((pizza) => {
                    if (
                        pizza.title === newPizza.title &&
                        pizza.type === newPizza.type &&
                        pizza.size === newPizza.size
                    ) {
                        pizza.count++;
                        isNewPizza = false;
                    }
                });

                if (isNewPizza) {
                    state.pizzas.push({ id: id(), ...newPizza });
                }
            }

            state.totalPrice += newPizza.price;
            state.totalCount += 1;
        },
        addPizzaFromCart: (state, action: PayloadAction<number>) => {
            for (let i = 0; i < state.pizzas.length; i++) {
                if (state.pizzas[i].id === action.payload) {
                    state.pizzas[i].count++;
                    state.totalCount++;
                    state.totalPrice += state.pizzas[i].price;
                    break;
                }
            }
        },
        removePizzaFromCart: (state, action: PayloadAction<number>) => {
            for (let i = 0; i < state.pizzas.length; i++) {
                if (state.pizzas[i].id === action.payload) {
                    state.pizzas[i].count--;
                    state.totalCount--;
                    state.totalPrice -= state.pizzas[i].price;
                    break;
                }
            }
        },
        removeAllPizzas: (state) => {
            state.pizzas = [];
            state.totalCount = 0;
            state.totalPrice = 0;
        },
        removeCertainPizzas: (state, action: PayloadAction<number>) => {
            for (let i = 0; i < state.pizzas.length; i++) {
                if (state.pizzas[i].id === action.payload) {
                    const certainPizzasCount = state.pizzas[i].count;
                    const certainPizzasTotalPrice =
                        certainPizzasCount * state.pizzas[i].price;

                    state.totalPrice -= certainPizzasTotalPrice;
                    state.totalCount -= certainPizzasCount;
                    state.pizzas.splice(i, 1);
                    break;
                }
            }
        },
    },
});

const { actions, reducer } = cartSlice;

export default reducer;

export const {
    addPizza,
    addPizzaFromCart,
    removePizzaFromCart,
    removeAllPizzas,
    removeCertainPizzas,
} = actions;
