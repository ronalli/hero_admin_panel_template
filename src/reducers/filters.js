const initialState = {
	filters: [],
	activeFilter: 'all'
}

const filters = (state = initialState, action) => {
	switch (action.type) {
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
		default: return state
	}
}

export default filters;