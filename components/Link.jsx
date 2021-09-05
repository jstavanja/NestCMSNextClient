import { withRouter } from 'next/router'
import Link from 'next/link'
import React, { Children } from 'react'

const ActiveLink = ({ router, children, ...props }) => {
  const child = Children.only(children)

  let className = child.props.className || null
  if (router.pathname === props.href) {
    className = `${className !== null ? className : ''} link-active`.trim()
  }

  delete props.activeClassName

  return <Link {...props}>{React.cloneElement(child, { className })}</Link>
}

const linkWithRouter = withRouter(ActiveLink)

export default linkWithRouter
