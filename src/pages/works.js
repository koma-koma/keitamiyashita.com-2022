import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const About = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes
  const [art, setArt] = React.useState(true);
  const [collab, setCollab] = React.useState(true);

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="works" />
        <h1>works</h1>
        <p>...
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="works" />
      <div style={{ position: 'fixed', top: '32px', zIndex: 200 }}>
        <h1 style={{ marginTop: '-8px', marginBottom: 0, display: 'inline-block' }}>works</h1>
        <div style={{ display: 'inline-block' }}>
          <span
            style={{
              backgroundColor: art ? 'black' : null,
              color: art ? 'white' : null,
              padding: '1px 4px',
              marginLeft: '16px',
              marginRight: '10px',
              cursor: "pointer",
            }}
            onClick={() => setArt(!art)}
          >
            solo
          </span>
          <span
            style={{
              background: collab ? 'black' : null,
              color: collab ? 'white' : null,
              cursor: "pointer",
              padding: '1px 4px',
            }}
            onClick={() => setCollab(!collab)}
          >
            collaboration
          </span>
        </div>
      </div>
      <ol style={{ listStyle: `none`, marginTop: '52px' }}>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug
          const category = post.frontmatter.category;

          if (category === 'art') {
            if (!art) return;
          } else if (category === 'collaboration') {
            if (!collab) return;
          }

          return (
            <li key={post.fields.slug} style={{ marginBottom: '32px' }}>
              <article
                className="works-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <Link to={post.fields.slug} itemProp="url">
                  {post.frontmatter.image && <GatsbyImage image={getImage(post.frontmatter.image)} alt={post.fields.title} />}
                  <h2 style={{
                    display: 'inline-block',
                    fontSize: '1rem',
                    fontWeight: 400,
                    marginTop: '8px',
                    maxWidth: 'calc(100% - 48px)'
                  }}>
                    <span itemProp="headline">{title}</span>
                  </h2>
                  <span style={{
                    fontSize: '1rem',
                    fontWeight: 500,
                    position: 'absolute',
                    right: 0,
                    textAlign: 'right',
                    marginTop: '4px'
                  }} >{post.frontmatter.date}</span>
                </Link>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout >
  )
}

export default About

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: {
        frontmatter: { draft: { eq: false } },
        fields: { collection: { eq: "works" } }
      },
      sort: {
        fields: [frontmatter___date], order: DESC
      }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "YYYY")
          title
          category
          description
          tags
          image {
            childImageSharp {
              gatsbyImageData(
                width: 720
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
        }
      }
    }
  }
`
