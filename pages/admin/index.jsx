import { observer } from 'mobx-react';
import { useContext } from 'react';
import AdminLayout from '../../layouts/admin'
import UserStore from '../../stores/userStore';

const Home = observer(() => {
  const userStore = useContext(UserStore)

  return (
    <>
      <AdminLayout title='Dashboard'>
        <div className='page-content'>Welcome to the admin panel, {userStore?.currentUser?.username}!</div>
      </AdminLayout>
      <style jsx>{`
        .page-content {
          padding: 50px;
        }
      `}</style>
    </>
  )
})

export default Home
