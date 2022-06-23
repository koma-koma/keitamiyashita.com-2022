import * as React from "react"
import { Link, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"


import Layout from "../components/layout"
import Seo from "../components/seo"

const Index = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="index" />
        <StaticImage src="../images/top_image.png" alt="top image" />
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="index" />
      <StaticImage src="../images/top_image.png" alt="top image" />
      <h2 style={{ fontSize: '1.1rem', margin: '16px 0 0 0' }}>info</h2>
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug

          return (
            <>
              <li key={post.fields.slug}>
                <article
                  className="info-list-item"
                  itemScope
                  itemType="http://schema.org/Article"
                >
                  <Link to={post.fields.slug} itemProp="url">
                    <header>
                      <h2 style={{ fontSize: '0.9rem', margin: '8px 0 0 0' }}>
                        <span itemProp="headline">{title}</span>
                      </h2>
                      <small>{post.frontmatter.date}</small>
                    </header>
                    <section>
                      <p
                        style={{ fontSize: '0.8rem', margin: '8px 0 0 0' }}
                        dangerouslySetInnerHTML={{
                          __html: post.frontmatter.description || post.excerpt,
                        }}
                        itemProp="description"
                      />
                    </section>
                  </Link>
                </article>
              </li>
            </>
          )
        })}
      </ol>
    </Layout>
  )
}

export default Index

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 5, filter: { fields: { collection: { eq: "info" } }}, sort: { fields: [frontmatter___date], order: DESC }) {
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
