import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import AdminLayout from '../../../layouts/admin'
import { show as fetchPage, update as editPage } from '../../../services/pages'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from '@chakra-ui/button';
import { Container, VStack } from '@chakra-ui/layout';
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Textarea } from '@chakra-ui/textarea';
import { Checkbox } from '@chakra-ui/checkbox';
import Link from '../../../components/Link';
import { useToast } from '@chakra-ui/toast';

const PageEdit = () => {

	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')
	const [permalink, setPermalink] = useState('')
	const [isPublished, setIsPublished] = useState('')
	const [pageDataFetched, setPageDataFetched] = useState(false)

	const toast = useToast()

	const router = useRouter()

	useEffect(() => {
		if (!router.isReady) return;

		async function fetchPageData() {
			const { title, content, permalink, isPublished } = await fetchPage(router?.query?.page)
			setTitle(title)
			setContent(content)
			setPermalink(permalink)
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

		try {
			await editPage(router.query.page, values)

			setSubmitting = false

			toast({
				title: "Page edited.",
				description: "The page was successfully edited.",
				status: "success",
				duration: 3000,
				isClosable: true,
			})
		} catch (error) {
			toast({
				title: "Failed to edit page.",
				description: `The page cannot be edited at this moment. Try again later. Reason: ${error.message}`,
				status: "error",
				duration: 3000,
				isClosable: true,
			})	
		}
	}

	return (
		<>
			<AdminLayout title={`Edit page ${title}`}>
				<Container mt="40px">
					<Link href='../pages'>
						<Button size="sm">&lt;- Back to the list of pages</Button>
					</Link>
					<Container mt="20px">
						{
							pageDataFetched &&
							<Formik
								initialValues={{ title, content, permalink, isPublished }}	
								validate={validatePageEditForm}
								onSubmit={submitPageEditForm}
							>
								{({ isSubmitting }) => (
									<Form>
										<VStack>
											<Field type="text" name="title">
												{({ field, form }) => (
													<FormControl isInvalid={form.errors.title && form.touched.title}>
														<FormLabel htmlFor="title">Title</FormLabel>
														<Input {...field} id="title" placeholder="Title" />
														<FormErrorMessage>{form.errors.title}</FormErrorMessage>
													</FormControl>
												)}
											</Field>
											<Field type="text" name="permalink">
												{({ field, form }) => (
													<FormControl isInvalid={form.errors.permalink && form.touched.permalink}>
														<FormLabel htmlFor="permalink">Permalink (slug)</FormLabel>
														<Input {...field} id="permalink" placeholder="page_slug" />
														<FormErrorMessage>{form.errors.permalink}</FormErrorMessage>
													</FormControl>
												)}
											</Field>
											<Field type="textarea" name="content">
												{({ field, form }) => (
													<FormControl isInvalid={form.errors.content && form.touched.content}>
														<FormLabel htmlFor="content">Content</FormLabel>
														<Textarea {...field} id="content" name="content" />
														<FormErrorMessage>{form.errors.content}</FormErrorMessage>
													</FormControl>
												)}
											</Field>
											<Field type="checkbox" name="isPublished">
												{({ field, form }) => (
													<FormControl isInvalid={form.errors.content && form.touched.content}>
														<FormLabel htmlFor="content">Is published</FormLabel>
														<Checkbox {...field} id="is_published" name="is_published" />
														<FormErrorMessage>{form.errors.isPublished}</FormErrorMessage>
													</FormControl>
												)}
											</Field>
											<Button type="submit" isLoading={isSubmitting}>
												Edit
											</Button>
										</VStack>
									</Form>
								)}
							</Formik>
						}
					</Container>
				</Container>
			</AdminLayout>
		</>
	)
}

export default PageEdit
