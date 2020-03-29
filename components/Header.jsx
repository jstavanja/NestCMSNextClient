import Button from '../components/Button'
import Logo from '../components/Logo'
import AuthStore from '../stores/authStore'
import UserStore from '../stores/userStore'
import { useContext } from 'react'
import { observer } from 'mobx-react'
import Link from 'next/link'

export default observer(() => {
  const authStore = useContext(AuthStore)
  const userStore = useContext(UserStore)

  return (
    <>
      <div className='navigation'>
        <div className='navigation-part navigation-left'>
          <Logo className='logo' />
          <div className='navigation-items'>
            <Link href='/admin'>
              <a>Home</a>
            </Link>
          </div>
        </div>
        <div className='navigation-part navigation-right'>
          <div className='actions'>
            <span className='greeting'>
              Hello,{' '}
              {userStore.currentUser ? userStore.currentUser.username : '/'}
            </span>
            <Button text='Logout' onClick={() => authStore.logout()} />
          </div>
        </div>
      </div>
      <style jsx>{`
        .navigation {
          padding: 10px;
          display: flex;
          text-transform: uppercase;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(0, 0, 0, 0.25);
        }
        .navigation-part {
          display: flex;
          align-items: center;
        }
        .navigation-items {
          margin-left: 50px;
          font-size: 2rem;
        }
        .greeting {
          margin-right: 15px;
        }
        .actions {
          display: flex;
          align-items: center;
        }
        a {
          color: black;
          text-decoration: none;
        }
      `}</style>
    </>
  )
})
