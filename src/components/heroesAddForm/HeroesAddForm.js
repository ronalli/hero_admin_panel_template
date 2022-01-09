import { Formik, Form, Field, ErrorMessage } from "formik";
import { v4 as uuid } from "uuid";
import { useDispatch } from "react-redux";
import { heroAdd } from "../../actions";

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

	const dispatch = useDispatch();

	const pushChar = (char) => {
		// console.log(char)
		dispatch(heroAdd(char))
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
						<option >Я владею элементом...</option>
						<option value="fire">Огонь</option>
						<option value="water">Вода</option>
						<option value="wind">Ветер</option>
						<option value="earth">Земля</option>
					</Field>
				</div>

				<button type="submit" className="btn btn-primary">Создать</button>
			</Form>

		</Formik>

	)
}

export default HeroesAddForm;