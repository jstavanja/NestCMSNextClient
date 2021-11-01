import AdminLayout from '../../../layouts/admin'
import Link from '../../../components/Link'
import { Container, VStack } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import PageInfo from '../../../components/PageInfo'
import { observer } from 'mobx-react';
import useSWR from 'swr';
import { PATHS } from "../../../constants/api";
import { fetcher } from '../../../utils/fetcher';

const PageIndex = observer(() => {

  const { data: pages, error } = useSWR(PATHS.PAGES.INDEX, fetcher)

  return (
    <>
      <AdminLayout title='Pages Dashboard'>
        <Container>
          <Link href='pages/create'>
            <Button size="sm" mt="10px">Create new page</Button>
          </Link>
          <VStack align="stretch" as="ul" mt="20px">
            {
              error && <p>Couldn't fetch pages.</p>
            }
            {
              (!pages && !error) && <p>Pages loading...</p>
            }
            {
              pages && pages.map(page => (<PageInfo key={page.id} as='li' page={page}/>))
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
