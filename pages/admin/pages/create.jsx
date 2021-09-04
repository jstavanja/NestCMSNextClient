import AdminLayout from '../../../layouts/admin'
import { store as createPage } from '../../../services/pages'
import { Formik, Form, Field, ErrorMessage } from 'formik';

const PageCreate = () => {

	const validatePageCreateForm = values => {
		const errors = {};

		if (!values.title) {
			errors.title = 'Required'
		}

		if (!values.permalink) {
			errors.permalink = 'Required'
		}
		
		return errors;
	} 

	const submitPageCreateForm = async (values, { setSubmitting }) => {
		await createPage(values)
		setSubmitting = false
	}

	return (
		<>
		<AdminLayout title={`Create page`}>
			<div className="page-content">
				<Formik
					initialValues={{ title: '', content: '', isPublished: true }}
					validate={validatePageCreateForm}
					onSubmit={submitPageCreateForm}
				>
					{({ isSubmitting }) => (
						<Form>
							<label htmlFor="title">Title</label>
							<Field type="text" name="title"></Field>
							<ErrorMessage name="title" component="div" />
							<label htmlFor="permalink">Permalink</label>
							<Field type="text" name="permalink"></Field>
							<ErrorMessage name="permalink" component="div" />
							<label htmlFor="content">Content</label>
							<Field as="textarea" name="content"></Field>
							<ErrorMessage name="content" component="div" />
							<label htmlFor="isPublished">Is published</label>
							<Field type="checkbox" name="isPublished" />
							<button type="submit" disabled={isSubmitting}>
								Create
							</button>
							<ErrorMessage name="isPublished" component="div" />
						</Form>
					)}
				</Formik>
			</div>
		</AdminLayout>
		<style jsx>{`
			.page-content {
				padding: 50px;
			}
		`}</style>
		</>
	)
}

export default PageCreate
