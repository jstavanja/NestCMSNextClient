import { withRouter } from 'next/router'
import NextLink from 'next/link'
import React, { Children } from 'react'

const Link = ({ router, children, ...props }) => {
  const child = Children.only(children)

  let className = child.props.className || null
  if (router.pathname === props.href) {
    className = `${className !== null ? className : ''} link-active`.trim()
  }

  delete props.activeClassName

  return <NextLink {...props}>{React.cloneElement(child, { className })}</NextLink>
}

const linkWithRouter = withRouter(Link)

export default linkWithRouter
