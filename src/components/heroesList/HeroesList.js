import { useHttp } from '../../hooks/http.hook';
import { useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { createSelector } from 'reselect';

import { useGetHeroesQuery } from '../../api/apiSlice';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { heroDeleted, fetchHeroes } from './heroesSlice'
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

import './heroesList.scss'

const HeroesList = () => {

	const {
		data: heroes = [],
		isFetching,
		isLoading,
		isError
	} = useGetHeroesQuery()

	const activeFilter = useSelector(state => state.filters.activeFilter)

	const filteredHeroes = useMemo(() => {
		const filteredHeroes = heroes.slice();
		if (activeFilter === 'all') {
			return filteredHeroes;
		} else {
			return filteredHeroes.filter(item => item.element === activeFilter);
		}
	}, [heroes, activeFilter])

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

	if (isLoading) {
		return <Spinner />;
	} else if (isError) {
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