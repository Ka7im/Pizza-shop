import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum SortName {
    popularity = 'популярности',
    price = 'цене',
    alphabet = 'алфавиту',
}

export enum SortProperty {
    rating = 'rating',
    price = 'price',
    title = 'title',
}

interface IFilterSlice {
    searchValue: string;
    activeCategoryIndex: number;
    currentPage: number;
    sortType: {
        name: SortName;
        sortProperty: SortProperty;
    };
}

const initialState: IFilterSlice = {
    searchValue: '',
    activeCategoryIndex: 0,
    currentPage: 1,
    sortType: {
        name: SortName.popularity,
        sortProperty: SortProperty.rating,
    },
};

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setSortType: (state, action: PayloadAction<number>) => {
            switch (action.payload) {
                case 0:
                    state.sortType.sortProperty = SortProperty.rating;
                    state.sortType.name = SortName.popularity;
                    break;
                case 1:
                    state.sortType.sortProperty = SortProperty.price;
                    state.sortType.name = SortName.price;
                    break;
                case 2:
                    state.sortType.sortProperty = SortProperty.title;
                    state.sortType.name = SortName.alphabet;
                    break;
                default:
                    throw Error('Unknown active sort index');
            }
        },
        setSearchValue: (
            state,
            action: PayloadAction<IFilterSlice['searchValue']>
        ) => {
            state.searchValue = action.payload;
        },
        setActiveCategoryIndex: (
            state,
            action: PayloadAction<IFilterSlice['activeCategoryIndex']>
        ) => {
            state.activeCategoryIndex = action.payload;
        },
        setCurrentPage: (
            state,
            action: PayloadAction<IFilterSlice['currentPage']>
        ) => {
            state.currentPage = action.payload;
        },
        setFilters: (
            state,
            action: PayloadAction<{
                activeCategoryIndex: number;
                sortBy: SortProperty;
                currentPage: number;
            }>
        ) => {
            state.currentPage = action.payload.currentPage;
            state.activeCategoryIndex = action.payload.activeCategoryIndex;

            switch (action.payload.sortBy) {
                case SortProperty.rating:
                    state.sortType.sortProperty = SortProperty.rating;
                    state.sortType.name = SortName.popularity;
                    break;
                case SortProperty.price:
                    state.sortType.sortProperty = SortProperty.price;
                    state.sortType.name = SortName.price;
                    break;
                case SortProperty.title:
                    state.sortType.sortProperty = SortProperty.title;
                    state.sortType.name = SortName.alphabet;
                    break;
                default:
                    throw Error('Unknown active sort index');
            }
        },
    },
});

const { actions, reducer } = filterSlice;

export default reducer;

export const {
    setSortType,
    setSearchValue,
    setActiveCategoryIndex,
    setCurrentPage,
    setFilters,
} = actions;
