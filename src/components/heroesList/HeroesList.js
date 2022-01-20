import { useHttp } from '../../hooks/http.hook';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { heroDeleted, fetchHeroes, selectAll } from './heroesSlice'
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

import './heroesList.scss'

const HeroesList = () => {

	const filteredHeroesSelector = createSelector(
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

	const filteredHeroes = useSelector(filteredHeroesSelector);
	const { heroesLoadingStatus } = useSelector(state => state.heroes);
	const dispatch = useDispatch();
	const { request } = useHttp();

	const onDelete = useCallback((id) => {
		dispatch(heroDeleted(id))
		request(`http://localhost:3001/heroes/${id}`, "DELETE")
			.then(data => console.log('deleted'))
			.catch(err => console.log(err))
	}, [request])

	useEffect(() => {
		dispatch(fetchHeroes())
	}, []);

	if (heroesLoadingStatus === "loading") {
		return <Spinner />;
	} else if (heroesLoadingStatus === "error") {
		return <h5 className="text-center mt-5">Ошибка загрузки</h5>
	}

	const renderHeroesList = (arr) => {
		if (arr.length === 0) {
			return (
				<CSSTransition
					timeout={0}
					classNames="hero">
					<h5 className="text-center mt-5">Героев пока нет</h5>
				</CSSTransition>
			)
		}
		return arr.map(({ id, ...props }) => {
			return (
				<CSSTransition
					key={id}
					timeout={500}
					classNames="hero"
				>
					<HeroesListItem
						{...props}
						onDelete={() => onDelete(id)} />
				</CSSTransition>
			)
		})
	}

	const elements = renderHeroesList(filteredHeroes);
	return (
		<ul>
			<TransitionGroup>
				{elements}
			</TransitionGroup>
		</ul>
	)
}

export default HeroesList;