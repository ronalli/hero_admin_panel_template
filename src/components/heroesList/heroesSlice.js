import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { useHttp } from '../../hooks/http.hook';

const heroesAdapter = createEntityAdapter();

const initialState = heroesAdapter.getInitialState({
	heroesLoadingStatus: 'idle'
})

export const fetchHeroes = createAsyncThunk(
	'heroes',
	() => {
		const { request } = useHttp();
		return request("http://localhost:3001/heroes")
	}
)

const heroesSlice = createSlice({
	name: 'heroes',
	initialState,
	reducers: {
		heroAdd: (state, action) => {
			heroesAdapter.addOne(state, action.payload)
		},
		heroDeleted: (state, action) => {
			heroesAdapter.removeOne(state, action.payload)
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchHeroes.pending, state => {
				state.heroesLoadingStatus = 'loading';
			})
			.addCase(fetchHeroes.fulfilled, (state, action) => {
				heroesAdapter.setAll(state, action.payload)
				state.heroesLoadingStatus = 'idle';
			})
			.addCase(fetchHeroes.rejected, state => {
				state.heroesLoadingStatus = 'error';
			})
			.addDefaultCase(() => { })
	}
})

const { actions, reducer } = heroesSlice;

export default reducer;

const { selectAll } = heroesAdapter.getSelectors(state => state.heroes)

export const filteredHeroesSelector = createSelector(
	selectAll,
	state => state.filters.activeFilter,
	(heroes, filter) => {
		if (filter === 'all') {
			return heroes
		} else {
			return heroes.filter(item => item.element === filter)
		}
	}
)

export const {
	heroAdd,
	heroDeleted
} = actions;