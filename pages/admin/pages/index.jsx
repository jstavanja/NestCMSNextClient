import { useContext, useEffect } from 'react';
import AdminLayout from '../../../layouts/admin'
import Link from '../../../components/Link'
import { Container, VStack } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import PageInfo from '../../../components/PageInfo'
import { observer } from 'mobx-react';
import PagesStore from '../../../stores/pagesStore';

const PageIndex = observer(() => {

  const pagesStore = useContext(PagesStore)

  const fetchPages = async () => {
    await pagesStore.fetchPages()
  }

  useEffect(() => {
    fetchPages()
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
              pagesStore.pages.map(page => (<PageInfo key={page.id} as='li' page={page}/>))
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
})

export default PageIndex
