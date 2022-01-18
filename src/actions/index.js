import { createAction } from "@reduxjs/toolkit";

export const fetchHeroes = (request) => (dispatch) => {
	dispatch(heroesFetching());
	request("http://localhost:3001/heroes")
		.then(data => dispatch(heroesFetched(data)))
		.catch(() => dispatch(heroesFetchingError()))
}


export const fetchFiltres = (request) => (dispatch) => {
	request('http://localhost:3001/filters')
		.then(data => dispatch(filtersAdd(data)))
		.catch(err => console.log(err))
}

// export const heroesFetching = () => {
// 	return {
// 		type: 'HEROES_FETCHING'
// 	}
// }

export const heroesFetching = createAction('HEROES_FETCHING')

// export const heroesFetched = (heroes) => {
// 	return {
// 		type: 'HEROES_FETCHED',
// 		payload: heroes
// 	}
// }

export const heroesFetched = createAction('HEROES_FETCHED')

// export const heroesFetchingError = () => {
// 	return {
// 		type: 'HEROES_FETCHING_ERROR'
// 	}
// }

export const heroesFetchingError = createAction('HEROES_FETCHING_ERROR')

// export const heroAdd = (hero) => {
// 	return {
// 		type: 'HERO_ADD',
// 		payload: hero
// 	}
// }

export const heroAdd = createAction('HERO_ADD')

// export const filtersAdd = (filters) => {
// 	return {
// 		type: 'FILTERS_ADD',
// 		payload: filters
// 	}
// }

export const filtersAdd = createAction('FILTERS_ADD')

// export const filterHeroes = (filter) => {
// 	return {
// 		type: 'FILTER_HEROES',
// 		payload: filter
// 	}
// }

export const filterHeroes = createAction('FILTER_HEROES')

// export const deleteHero = (id) => {
// 	return {
// 		type: 'HERO_DELETE',
// 		payload: id
// 	}
// }

export const heroDeleted = createAction('HERO_DELETED')