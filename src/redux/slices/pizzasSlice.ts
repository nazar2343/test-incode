import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

type Pizza = {
	id: string;
	title: string;
	price: number;
	imageUrl: string;
	sizes: number[];
	types: number[];
};

interface PizzaSliceState {
	items: Pizza[];
	status: 'loading' | 'success' | 'error';
}

const initialState: PizzaSliceState = {
	items: [],
	status: 'loading',
};

export const fetchPizzas = createAsyncThunk<Pizza[], Record<string, string>>(
	'pizza/fetchPizzasStatus',
	async (params) => {
		const { sortBy, order, category, search, currentPageCount } = params;
		const response = await axios.get<Pizza[]>(
			`https://626d16545267c14d5677d9c2.mockapi.io/items?page=${currentPageCount}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
		);
		return response.data;
	}
);

const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setItems(state, action: PayloadAction<Pizza[]>) {
			state.items = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchPizzas.pending, (state) => {
			state.status = 'loading';
			state.items = [];
		});

		builder.addCase(fetchPizzas.fulfilled, (state, action) => {
			state.items = action.payload;
			state.status = 'success';
		});

		builder.addCase(fetchPizzas.rejected, (state) => {
			state.status = 'error';
			state.items = [];
		});
		// [fetchPizzas.pending]: (state) => {
		// 	state.status = 'loading';
		// 	state.items = [];
		// },
		// [fetchPizzas.fulfilled]: (state, action) => {
		// 	state.items = action.payload;
		// 	state.status = 'success';
		// },
		// [fetchPizzas.rejected]: (state) => {
		// 	state.status = 'error';
		// 	state.items = [];
		// },
	},
});

export const selectPizzaData = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
