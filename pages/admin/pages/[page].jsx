import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import AdminLayout from '../../../layouts/admin'
import { show as fetchPage, update as editPage } from '../../../services/pages'
import { Formik, Form, Field, ErrorMessage } from 'formik';

const PageEdit = () => {

	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')
	const [isPublished, setIsPublished] = useState('')
	const [pageDataFetched, setPageDataFetched] = useState(false)

	const router = useRouter()

	useEffect(() => {
		if (!router.isReady) return;

		async function fetchPageData() {
			const { title, content, isPublished } = await fetchPage(router?.query?.page)
			setTitle(title)
			setContent(content)
			setIsPublished(isPublished)
			setPageDataFetched(true)
		}

		fetchPageData()
	}, [router.isReady])

	const validatePageEditForm = values => {
		const errors = {};

		if (!values.title) {
			errors.title = 'Required'
		}

		if (values.isPublished == null) {
			errors.isPublished = 'Required'
		}
		
		return errors;
	} 

	const submitPageEditForm = async (values, { setSubmitting }) => {
		if (!router.query) return

		const response = await editPage(router.query.page, values)

		setSubmitting = false
	}

	return (
		<>
		<AdminLayout title={`Edit page ${title}`}>
			<div className="page-content">
				{
					pageDataFetched &&
					<Formik
						initialValues={{ title, content, isPublished }}	
						validate={validatePageEditForm}
						onSubmit={submitPageEditForm}
					>
						{({ isSubmitting }) => (
							<Form>
								<label htmlFor="title">Title</label>
								<Field type="text" name="title"></Field>
								<ErrorMessage name="title" component="div" />
								<label htmlFor="content">Title</label>
								<Field as="textarea" name="content"></Field>
								<ErrorMessage name="content" component="div" />
								<label htmlFor="isPublished">Is published</label>
								<Field type="checkbox" name="isPublished" />
								<button type="submit" disabled={isSubmitting}>
									Edit
								</button>
							</Form>
						)}
					</Formik>
				}
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

export default PageEdit
