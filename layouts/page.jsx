import Head from 'next/head'

const PageLayout = ({ children, title }) => {
	return (
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
}

export default PageLayout
