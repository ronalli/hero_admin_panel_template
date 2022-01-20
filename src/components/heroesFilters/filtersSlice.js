import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'
import { useHttp } from '../../hooks/http.hook'

const filtersAdapter = createEntityAdapter();

// const initialState = {
// 	filters: [],
// 	activeFilter: 'all',
// 	filtersLoadingStatus: 'idle'
// }

const initialState = filtersAdapter.getInitialState({
	activeFilter: 'all',
	filtersLoadingStatus: 'idle'
})

// export const fetchFiltres = (request) => (dispatch) => {
// 	request('http://localhost:3001/filters')
// 		.then(data => dispatch(filtersAdd(data)))
// 		.catch(err => console.log(err))
// }

export const fetchFilters = createAsyncThunk(
	'filters',
	() => {
		const { request } = useHttp();
		return request('http://localhost:3001/filters');
	}
)

const filtersSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		filterHeroes: (state, action) => { state.activeFilter = action.payload; }
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchFilters.pending, state => { state.filtersLoadingStatus = 'loading'; })
			.addCase(fetchFilters.fulfilled, (state, action) => {
				filtersAdapter.setAll(state, action.payload);
				// state.filters = action.payload;
				state.filtersLoadingStatus = 'idle';
			})
			.addCase(fetchFilters.rejected, state => { state.filtersLoadingStatus = 'error'; })
			.addDefaultCase(() => { })
	}
})

const { actions, reducer } = filtersSlice;

export default reducer;

export const { selectAll } = filtersAdapter.getSelectors(state => state.filters)

export const {
	filterHeroes
} = actions;