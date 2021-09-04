import { useEffect, useState } from 'react';
import api from '../../../api';
import AdminLayout from '../../../layouts/admin'
import Link from '../../../components/Link'
import { PATHS } from '../../../constants/api';
import { index as fetchPages, destroy as deletePage } from '../../../services/pages'

const PageIndex = () => {

  const [pages, setPages] = useState([])
  useEffect(() => {
    async function fetchPagesData() {
      const pages = await fetchPages()
      setPages(pages)
    }

    fetchPagesData()
  }, [])

  const handleDeletePage = async (pageId) => {
    await deletePage(pageId)
  }

  return (
    <>
      <AdminLayout title='Pages Dashboard'>
        <div className='page-content'>
          <h1>Pages editor</h1>
          <Link href='pages/create'>
            <button type='button'>Create new page</button>
          </Link>

          {
            pages.map(page => (
              <ul key={page.id}>
                <li>
                  <h3>{page.title}</h3>
                  <div className='actions'>
                    <Link href={'pages/'+page.id}><button>Edit</button></Link>
                    <button onClick={() => deletePage(page.id)}>Delete</button>
                  </div>
                </li>
              </ul>
            ))
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

export default PageIndex
