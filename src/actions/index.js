export const heroesFetching = () => {
	return {
		type: 'HEROES_FETCHING'
	}
}

export const heroesFetched = (heroes) => {
	return {
		type: 'HEROES_FETCHED',
		payload: heroes
	}
}

export const heroesFetchingError = () => {
	return {
		type: 'HEROES_FETCHING_ERROR'
	}
}

export const heroAdd = (hero) => {
	return {
		type: 'HERO_ADD',
		payload: hero
	}
}

export const filtersAdd = (filters) => {
	return {
		type: 'FILTERS_ADD',
		payload: filters
	}
}

export const filterHeroes = (filter) => {
	return {
		type: 'FILTER_HEROES',
		payload: filter
	}
}

export const deleteHero = (id) => {
	return {
		type: 'HERO_DELETE',
		payload: id
	}
}