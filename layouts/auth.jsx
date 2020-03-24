import React from 'react'
import Head from 'next/head'

export default ({ children, title }) => (
  <div>
    <Head>
      <title>{title} | NestCMS</title>
      <link
        href='https://fonts.googleapis.com/css?family=Barlow+Condensed&display=swap'
        rel='stylesheet'
      ></link>
    </Head>

    {children}

    <style jsx global>{`
      * {
        box-sizing: border-box;
        font-family: 'Barlow Condensed', sans-serif;
      }
    `}</style>
  </div>
)
