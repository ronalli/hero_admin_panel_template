import { useSelector } from "react-redux";
// import { filtersAdd } from "../../actions";


// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {

	const { filters } = useSelector(state => state)

	const switchBtn = (filter, option) => {
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
				return "btn-outline-dark active"
		}
	}

	const renderButtons = (filters) => {
		return filters.map(({ option, filter }) => {
			let crazy = switchBtn(filter)
			return <button className={`btn ${crazy}`}>{option}</button>
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