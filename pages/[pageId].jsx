import { Container, Heading, Text } from "@chakra-ui/layout";
import PageLayout from "../layouts/page";
import { index as fetchAllPages, show as fetchPage } from '../services/pages'

const Page = ({ title, content, errorMessage }) => {
	return <PageLayout title={title}>
		<Container>
			{
				!errorMessage ? <>
					<Heading size="lg">{title}</Heading>
					<Text>{content}</Text>
				</> : <>
					<Heading size="lg">Oops.</Heading>
					<Text>The page you were trying to find is not available.</Text>
					<Text>Reason: {errorMessage}</Text>
				</>
			}
		</Container>
	</PageLayout>
}

export async function getStaticPaths() {
	const allPages = await fetchAllPages()
	
	const paths = allPages.map((page) => ({
		params: { pageId: page.id.toString() },
	}))
  
	return { paths, fallback: false }
  }

export async function getStaticProps({ params: { pageId } }) {
	try {
		const { title, content } = await fetchPage(pageId)
		return { props: { title, content, errorMessage: null }}
	} catch (fetchingError) {
		return { props: { title: null, content: null, errorMessage: fetchingError.message }}
	}
}

export default Page
