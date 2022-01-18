import { createAction } from "@reduxjs/toolkit";
import { heroesFetching, heroesFetched, heroesFetchingError } from '../components/heroesList/heroesSlice'

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

export const filtersAdd = createAction('FILTERS_ADD')

export const filterHeroes = createAction('FILTER_HEROES')

