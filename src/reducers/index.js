const initialState = {
	heroes: [],
	heroesLoadingStatus: 'idle',
	filters: [],
	sortHeroes: [],
	activeFilter: 'all'
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'HEROES_FETCHING':
			return {
				...state,
				heroesLoadingStatus: 'loading'
			}
		case 'HEROES_FETCHED':
			return {
				...state,
				heroes: action.payload,
				sortHeroes: state.activeFilter === 'all' ? action.payload : state.heroes.filter(item => item.element === state.activeFilter),
				heroesLoadingStatus: 'idle'
			}
		case 'HEROES_FETCHING_ERROR':
			return {
				...state,
				heroesLoadingStatus: 'error'
			}
		case 'HERO_ADD':
			let listHeroes = [...state.heroes, action.payload];
			return {
				...state,
				heroes: listHeroes,
				sortHeroes: state.activeFilter === 'all' ? listHeroes : listHeroes.filter(item => item.element === state.activeFilter),
			}
		case 'FILTERS_ADD':
			return {
				...state,
				filters: action.payload
			}
		case 'FILTER_HEROES':
			return {
				...state,
				activeFilter: action.payload,
				sortHeroes: action.payload === 'all' ? state.heroes : state.heroes.filter(item => item.element === action.payload)
			}
		case 'DELETE_HERO':
			let newListHeroes = state.heroes.filter(item => item.id !== action.payload);
			return {
				...state,
				heroes: newListHeroes,
				sortHeroes: state.activeFilter === 'all' ? newListHeroes : newListHeroes.filter(item => item.element === state.activeFilter),
			}
		default: return state
	}
}

export default reducer;