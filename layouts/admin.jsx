import Head from 'next/head'

import Header from '../components/Header'
import UserStore from '../stores/userStore'
import { observe } from 'mobx'
import { useContext, useEffect } from 'react'
import Router from 'next/router'
import { commonStore } from '../stores/commonStore'

const AdminLayout = ({ children, title }) => {
  const userStore = useContext(UserStore)

  useEffect(() => {
    if (!commonStore.token) {
      Router.push('/login')
    }
  })

  observe(userStore, 'currentUser', ({ newValue }) => {
    const currentUser = newValue
    if (!currentUser) {
      Router.push('/login')
    }
  })

  return (
    <div>
      <Head>
        <title>{title} | NestCMS</title>
        <link
          href='https://fonts.googleapis.com/css?family=Barlow+Condensed&display=swap'
          rel='stylesheet'
        ></link>
      </Head>

      <Header />

      {children}

      <style jsx global>{`
        * {
          box-sizing: border-box;
          font-family: 'Barlow Condensed', sans-serif;
        }
      `}</style>
    </div>
  )
}

export default AdminLayout
