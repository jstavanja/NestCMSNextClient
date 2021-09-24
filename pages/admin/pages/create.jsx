import AdminLayout from '../../../layouts/admin'
import { store as createPage } from '../../../services/pages'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Container, VStack } from '@chakra-ui/layout';
import Link from '../../../components/Link';
import { Button } from '@chakra-ui/button';
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Textarea } from '@chakra-ui/textarea';
import { Checkbox } from '@chakra-ui/checkbox';
import { useToast } from '@chakra-ui/toast';
import { useRouter } from 'next/router';

const PageCreate = () => {

	const toast = useToast()
	const router = useRouter()

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
		try {
			await createPage(values)
			setSubmitting = false

			toast({
				title: "Page created.",
				description: "The page was successfully created.",
				status: "success",
				duration: 3000,
				isClosable: true,
			})

			router.push('../pages')
		} catch (error) {
			toast({
				title: "Failed to create page.",
				description: `The page cannot be created at this moment. Try again later. Reason: ${error.message}`,
				status: "error",
				duration: 3000,
				isClosable: true,
			})	
		}
	}

	return (
		<>
			<AdminLayout title={`Create page`}>
				<Container mt="40px">
					<Link href='../pages'>
						<Button size="sm">&lt;- Back to the list of pages</Button>
					</Link>
					<Container mt="20px">
						<Formik
							initialValues={{ title: '', content: '', permalink: '', isPublished: true }}
							validate={validatePageCreateForm}
							onSubmit={submitPageCreateForm}
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
											Create
										</Button>
									</VStack>
								</Form>
							)}
						</Formik>
					</Container>
				</Container>
			</AdminLayout>
		</>
	)
}

export default PageCreate
