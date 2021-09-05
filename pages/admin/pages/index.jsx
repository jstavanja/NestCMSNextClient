import { useEffect, useState } from 'react';
import AdminLayout from '../../../layouts/admin'
import Link from '../../../components/Link'
import { index as fetchPages, destroy as deletePage } from '../../../services/pages'
import { Container, Flex, Heading, VStack } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import PageInfo from '../../../components/PageInfo'

const PageIndex = () => {

  const [pages, setPages] = useState([])
  
  useEffect(() => {
    async function fetchPagesData() {
      const pages = await fetchPages()
      setPages(pages)
    }

    fetchPagesData()
  }, [])

  return (
    <>
      <AdminLayout title='Pages Dashboard'>
        <Container>
          <Link href='pages/create'>
            <Button size="sm" mt="10px">Create new page</Button>
          </Link>
          <VStack align="stretch" as="ul" mt="20px">
            {
              pages.map(page => (<PageInfo key={page.id} as='li' page={page}/>))
            }
          </VStack>
        </Container>
      </AdminLayout>
      <style jsx>{`
        .page-content {
          padding: 50px;
        }
      `}</style>
    </>
  )
}

export default PageIndex
