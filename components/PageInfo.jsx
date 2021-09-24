import { Box, HStack, Flex, VStack } from '@chakra-ui/layout'
import Link from './Link'
import { destroy as deletePage } from '../services/pages'
import { Button } from '@chakra-ui/button';
import { PATHS } from '../constants/api';
import { useContext } from 'react';
import PagesStore from '../stores/pagesStore';
import { useToast } from '@chakra-ui/toast';

const PageInfo = ({ as, page: {id, title, permalink, content}}) => {
	const pagesStore = useContext(PagesStore)
	const toast = useToast()

	const handleDeletePage = async (pageId) => {
		await pagesStore.deletePage(pageId)

		toast({
			title: "Page deleted.",
			description: "The page was successfully deleted.",
			status: "success",
			duration: 3000,
			isClosable: true,
		})
	}

	return (
		<Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' as={as}>
			<Box p='6'>
				<Box d='flex' alignItems='baseline'>
					<Box
						color='gray.500'
						fontWeight='semibold'
						letterSpacing='wide'
						fontSize='xs'
						textTransform='uppercase'
					>
						id: {id} &bull; permalink: {permalink}
					</Box>
				</Box>

				<Box mt='1' fontWeight='semibold' as='h4' lineHeight='tight' isTruncated>
					{title}
				</Box>

				<Box>
					{content?.substring(0, 150)} ...
				</Box>

				<HStack mt="10px">
					<Link href={`${PATHS.PAGES.INDEX}/${id}`}>
						<Button colorScheme="teal" size="xs">Edit</Button>
					</Link>
					<Button colorScheme="red" size="xs" onClick={() => handleDeletePage(id)}>Delete</Button>
				</HStack>
			</Box>
		</Box>
	)
}

export default PageInfo
