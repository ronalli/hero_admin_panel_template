import { Formik, Form, Field, ErrorMessage } from "formik";
import { v4 as uuid } from "uuid";
import * as Yup from 'yup'
import { useCreateHeroMutation, useGetFiltersQuery } from "../../api/apiSlice";

const HeroesAddForm = () => {

	const [createHero] = useCreateHeroMutation();
	const {
		data: filters = []
	} = useGetFiltersQuery()

	const renderFilters = () => {
		return (
			filters.map((element, index) => {
				if (index === 0) return <option value="" key={index}>Я владею элементом...</option>
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
			validationSchema={
				Yup.object({
					name: Yup.string()
						.min(3, 'Min length name three symbols')
						.required('Required field'),
					description: Yup.string()
						.min(10, 'Min length description ten symbols')
						.required('Required field'),
					element: Yup.string()
						.required('Required field')
				})
			}
			onSubmit={(char, { resetForm }) => {
				char.id = uuid();
				createHero(char).unwrap();
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
					<ErrorMessage className="error" name="name" component="div" />

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
					<ErrorMessage className="error" name="description" component="div" />

				</div>

				<div className="mb-3">
					<label htmlFor="element" className="form-label">Выбрать элемент героя</label>
					<Field
						as="select"
						className="form-select"
						id="element"
						name="element">
						{renderFilters()}
					</Field>
					<ErrorMessage className="error" name="element" component="div" />
				</div>

				<button type="submit" className="btn btn-primary">Создать</button>
			</Form>

		</Formik>

	)
}

export default HeroesAddForm;