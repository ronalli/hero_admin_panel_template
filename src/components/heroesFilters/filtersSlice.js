import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	filters: [],
	activeFilter: 'all'
}

const filtersSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		filtersAdd: (state, action) => { state.filters = action.payload },
		filterHeroes: (state, action) => { state.activeFilter = action.payload }
	}
})

const { actions, reducer } = filtersSlice;
export default reducer;

export const {
	filtersAdd,
	filterHeroes
} = actions;