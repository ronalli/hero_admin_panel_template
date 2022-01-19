// import { heroesFetching, heroesFetched, heroesFetchingError } from '../components/heroesList/heroesSlice';
import { filtersAdd } from '../components/heroesFilters/filtersSlice';

// export const fetchHeroes = (request) => (dispatch) => {
// 	dispatch(heroesFetching());
// 	request("http://localhost:3001/heroes")
// 		.then(data => dispatch(heroesFetched(data)))
// 		.catch(() => dispatch(heroesFetchingError()))
// }


export const fetchFiltres = (request) => (dispatch) => {
	request('http://localhost:3001/filters')
		.then(data => dispatch(filtersAdd(data)))
		.catch(err => console.log(err))
}
