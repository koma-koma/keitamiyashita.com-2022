import * as React from "react"
import { Link, graphql } from "gatsby"

import Header from "./header"


const mainStyles = {
  position: 'relative',
  top: '32px',
  marginLeft: '252px',
  paddingRight: '32px',
  paddingBottom: '120px',
  maxWidth: '740px'
}

const footerStyles = {
  position: 'fixed',
  width: '100vw',
  height: '128px',
  bottom: '0px',
  background: 'linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))',
  zIndex: 200
}

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <div className="" data-is-root-path={isRootPath}>
      <Header location={location} />
      <main className="main-contents" style={mainStyles}>{children}</main>
      <footer style={footerStyles}>
        <span style={{
          position: 'absolute',
          padding: 0,
          right: '32px',
          bottom: '32px',
        }}>©2022 keitamiyashita</span>
      </footer>
    </div >
  )
}

export default Layout


export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          tags
        }
      }
    }
  }
`
