import { useSelector, useDispatch } from "react-redux";
import { filterHeroes } from "./filtersSlice";

import { useGetFiltersQuery } from "../../api/apiSlice";

import './heroesFilters.css'

const HeroesFilters = () => {

	const {
		data: filters = [],
	} = useGetFiltersQuery();

	const dispatch = useDispatch();
	const { activeFilter } = useSelector(state => state.filters)
	const switchBtn = (filter) => {
		switch (filter) {
			case 'fire':
				return "btn-danger"
			case 'water':
				return "btn-primary"
			case 'wind':
				return "btn-success"
			case 'earth':
				return "btn-secondary"
			case 'all':
				return "btn-outline-dark"
		}
	}

	const activeFilters = (filter) => {
		dispatch(filterHeroes(filter));
	}

	const renderButtons = (filters) => {
		return filters.map(({ option, filter }) => {
			let crazy = switchBtn(filter)
			if (filter === activeFilter) crazy += ' active'
			return <button
				key={filter}
				onClick={() => activeFilters(filter)}
				className={`btn ${crazy}`}>{option}</button>
		})
	}

	const buttons = renderButtons(filters);

	return (
		<div className="card shadow-lg mt-4">
			<div className="card-body">
				<p className="card-text">Отфильтруйте героев по элементам</p>
				<div className="btn-group">
					{buttons}
				</div>
			</div>
		</div>
	)
}

export default HeroesFilters;