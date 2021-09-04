import Button from '../components/Button'
import Logo from '../components/Logo'
import AuthStore from '../stores/authStore'
import UserStore from '../stores/userStore'
import CommonStore from '../stores/commonStore'
import { useContext, useEffect } from 'react'
import { observer } from 'mobx-react'
import Link from '../components/Link'

export default observer(() => {
  const authStore = useContext(AuthStore)
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
      <div className='navigation'>
        <div className='navigation-part navigation-left'>
          <Logo className='logo' />
          <div className='navigation-items'>
            <Link href='/admin'>
              <a>Home</a>
            </Link>
            <Link href='/admin/pages'>
              <a>Pages</a>
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
          padding: 20px;
          display: flex;
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
          text-transform: uppercase;
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
          margin-left: 40px;
        }
        a.link-active {
          border-bottom: 2px solid #2cc2a3;
        }
      `}</style>
    </>
  )
})
