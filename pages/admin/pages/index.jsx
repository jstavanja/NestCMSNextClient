import { useContext, useEffect, useState } from 'react';
import AdminLayout from '../../../layouts/admin'
import Link from '../../../components/Link'
import { Container, VStack } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import PageInfo from '../../../components/PageInfo'
import { observer } from 'mobx-react';
import PagesStore from '../../../stores/pagesStore';
import { useToast } from '@chakra-ui/toast';

const PageIndex = observer(() => {

  const [pagesFetchError, setPagesFetchError] = useState(null)

  const pagesStore = useContext(PagesStore)
  const toast = useToast()

  const createPrettyPagesFetchErrorMessage = (errorMessage) =>
    `The pages list cannot be fetched. Try again later. Reason: ${errorMessage}`

  const fetchPages = async () => {
    try {
      await pagesStore.fetchPages()
    } catch (error) {
      setPagesFetchError(error.message)
      toast({
        title: "Could not fetch pages.",
        description: createPrettyPagesFetchErrorMessage(error.message),
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    }
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
              !pagesFetchError
                ? pagesStore.pages.map(page => (<PageInfo key={page.id} as='li' page={page}/>))
                : <p>{createPrettyPagesFetchErrorMessage(pagesFetchError)}</p>  
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
