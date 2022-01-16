const initialState = {
	heroes: [],
	heroesLoadingStatus: 'idle',
	filters: [],
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
				heroesLoadingStatus: 'idle'
			}
		case 'HEROES_FETCHING_ERROR':
			return {
				...state,
				heroesLoadingStatus: 'error'
			}
		case 'HERO_ADD':
			return {
				...state,
				heroes: [...state.heroes, action.payload],
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
			}
		case 'DELETE_HERO':
			return {
				...state,
				heroes: state.heroes.filter(item => item.id !== action.payload)
			}
		default: return state
	}
}

export default reducer;