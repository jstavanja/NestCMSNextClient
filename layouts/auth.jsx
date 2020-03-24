import React from 'react'
import Head from 'next/head'

export default ({ children, title }) => (
  <div>
    <Head>
      <title>{title} | NestCMS</title>
      <link
        href='https://fonts.googleapis.com/css?family=Oswald&display=swap'
        rel='stylesheet'
      />
    </Head>

    {children}

    <style jsx global>{`
      * {
        box-sizing: border-box;
        font-family: 'Oswald', sans-serif;
      }
    `}</style>
  </div>
)
