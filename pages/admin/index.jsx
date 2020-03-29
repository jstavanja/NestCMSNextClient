import { useContext, useEffect } from 'react'

import AdminLayout from '../../layouts/admin'
import UserStore from '../../stores/userStore'
import CommonStore from '../../stores/commonStore'

const Home = () => {
  const userStore = useContext(UserStore)
  const commonStore = useContext(CommonStore)

  const pullUser = async () => {
    if (commonStore.token) {
      await userStore.pullUser()
      await commonStore.setAppLoaded()
    }
  }

  useEffect(() => {
    pullUser()
  }, [])

  return (
    <>
      <AdminLayout title='Dashboard'>
        <div className='page-content'>Welcome to the admin panel.</div>
      </AdminLayout>
      <style jsx>{`
        .page-content {
          padding: 50px;
        }
      `}</style>
    </>
  )
}

export default Home
