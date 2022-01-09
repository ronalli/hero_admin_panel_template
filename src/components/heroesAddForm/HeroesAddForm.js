import { Formik, Form, Field, ErrorMessage } from "formik";
import { v4 as uuid } from "uuid";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { heroAdd, filtersAdd } from "../../actions";
import { useHttp } from "../../hooks/http.hook";

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {

	const [elements, setElements] = useState([]);
	const { request } = useHttp();
	const dispatch = useDispatch();

	useEffect(() => {
		request('http://localhost:3001/filters')
			.then(data => {
				setElements(data)
				dispatch(filtersAdd(data))
			})
			.catch(() => console.log('error'))
	}, [])



	const pushChar = (char) => {
		dispatch(heroAdd(char))
		request('http://localhost:3001/heroes', "POST", JSON.stringify(char))
	}

	const onget = () => {
		return (
			elements.map((element, index) => {
				console.log()
				if (index === 0) return <option key={index}>Я владею элементом...</option>
				return <option key={index} value={element.filter}>{element.option}</option>
			})
		)
	}

	return (

		<Formik
			initialValues={{
				name: "",
				description: "",
				element: ""
			}}
			onSubmit={(char, { resetForm }) => {
				char.id = uuid();
				pushChar(char)
				resetForm();
			}}
		>
			<Form className="border p-4 shadow-lg rounded">
				<div className="mb-3">
					<label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
					<Field
						type="text"
						name="name"
						className="form-control"
						id="name"
						placeholder="Как меня зовут?" />
				</div>

				<div className="mb-3">
					<label htmlFor="text" className="form-label fs-4">Описание</label>
					<Field
						name="description"
						className="form-control"
						as="textarea"
						id="description"
						placeholder="Что я умею?"
						style={{ "height": '130px' }} />
				</div>

				<div className="mb-3">
					<label htmlFor="element" className="form-label">Выбрать элемент героя</label>
					<Field
						as="select"
						className="form-select"
						id="element"
						name="element">
						{onget()}
					</Field>
				</div>

				<button type="submit" className="btn btn-primary">Создать</button>
			</Form>

		</Formik>

	)
}

export default HeroesAddForm;