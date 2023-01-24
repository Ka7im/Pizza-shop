import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    activeCategoryIndex: 0,
    currentPage: 1,
    sortType: {
        name: 'популярности',
        sortProperty: 'rating',
    },
    isSortVisible: false,
};

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setSortType: (state, action) => {
            state.isSortVisible = false;

            switch (action.payload) {
                case 0:
                    state.sortType.sortProperty = 'rating';
                    state.sortType.name = 'популярности';
                    break;
                case 1:
                    state.sortType.sortProperty = 'price';
                    state.sortType.name = 'цене';
                    break;
                case 2:
                    state.sortType.sortProperty = 'title';
                    state.sortType.name = 'алфавиту';
                    break;
                default:
                    throw Error('Unknown active sort index');
            }
        },
        setIsSortVisible: (state, action) => {
            state.isSortVisible = action.payload;
        },
        setActiveCategoryIndex: (state, action) => {
            state.activeCategoryIndex = action.payload;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setFilters: (state, action) => {
            state.currentPage = +action.payload.currentPage;
            state.activeCategoryIndex = +action.payload.activeCategoryIndex;
            switch (action.payload.sortBy) {
                case 'rating':
                    state.sortType.sortProperty = 'rating';
                    state.sortType.name = 'популярности';
                    break;
                case 'price':
                    state.sortType.sortProperty = 'price';
                    state.sortType.name = 'цене';
                    break;
                case 'title':
                    state.sortType.sortProperty = 'title';
                    state.sortType.name = 'алфавиту';
                    break;
                default:
                    throw Error('Unknown active sort index');
            }
        },
        setIsVisible: (state, action) => {
            state.isSortVisible = action.payload;
        },
    },
});

const { actions, reducer } = filterSlice;

export default reducer;

export const {
    setSortType,
    setIsSortVisible,
    setActiveCategoryIndex,
    setCurrentPage,
    setFilters,
    setIsVisible,
} = actions;
