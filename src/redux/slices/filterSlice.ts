import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { RootState } from '../store';

type Sort = {
	name: string;
	sortProperty: 'rating' | 'title' | 'price' | '-rating' | '-title' | '-price';
};

interface FilterSliceState {
	searchValue: string;
	categoryId: number;
	currentPageCount: number;
	sort: Sort;
}

const initialState: FilterSliceState = {
	searchValue: '',
	categoryId: 0,
	currentPageCount: 1,
	sort: {
		name: 'популярності',
		sortProperty: 'rating',
	},
};

const filterSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setCategoryId(state, action: PayloadAction<number>) {
			state.categoryId = action.payload;
		},
		setSearchValue(state, action: PayloadAction<string>) {
			state.searchValue = action.payload;
		},
		setSort(state, action: PayloadAction<Sort>) {
			state.sort = action.payload;
		},
		setCurrentPageCount(state, action: PayloadAction<number>) {
			state.currentPageCount = action.payload;
		},
		setFilters(state, action: PayloadAction<FilterSliceState>) {
			if (Object.keys(action.payload).length) {
				state.currentPageCount = Number(action.payload.currentPageCount);
				state.categoryId = Number(action.payload.categoryId);
				state.sort = action.payload.sort;
			} else {
				state.currentPageCount = 1;
				state.categoryId = 0;
				state.sort = {
					name: 'популярности',
					sortProperty: 'rating',
				};
			}
		},
	},
});

export const selectFilter = (state: RootState) => state.filter;

export const selectSort = (state: RootState) => state.filter.sort;

export const {
	setCategoryId,
	setSort,
	setCurrentPageCount,
	setFilters,
	setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
