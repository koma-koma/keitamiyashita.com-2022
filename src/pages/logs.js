import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  const header = (
    <div style={{ position: 'fixed', top: '32px', zIndex: 200 }}>
      <h1 style={{ marginTop: '-8px', marginBottom: 0, display: 'inline-block' }}>logs</h1>
      {/* <div style={{ display: 'inline-block' }}>
            <span
              style={{
                backgroundColor: art ? 'black' : null,
                color: art ? 'white' : null,
                padding: '1px',
                marginLeft: '16px',
                marginRight: '10px',
                cursor: "pointer",
              }}
              onClick={() => setArt(!art)}
            >
              artwokrs
            </span>
            <span
              style={{
                background: client ? 'black' : null,
                color: client ? 'white' : null,
                cursor: "pointer",
              }}
              onClick={() => setClient(!client)}
            >
              clientwokrs
            </span>
          </div> */}
    </div>
  )

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="logs" />
        {header}
        <p>...
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="logs" />
      {header}
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug

          return (
            <li key={post.fields.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <Link to={post.fields.slug} itemProp="url">
                  <header>
                    <h2>
                      <span itemProp="headline">{title}</span>
                    </h2>
                    <small>{post.frontmatter.date}</small>
                  </header>
                  <section>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: post.frontmatter.description || post.excerpt,
                      }}
                      itemProp="description"
                    />
                  </section>
                </Link>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { draft: { eq: false } }, fields: { collection: { eq: "blog" } } },
      sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt(truncate: true)
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          category
          description
          tags
          draft
        }
      }
    }
  }
`
