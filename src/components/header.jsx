
import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import { Link } from "gatsby"


const navbarStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: ' 220px',
    height: '100vh',
    marginLeft: '32px',
    marginTop: '32px',
    zIndex: 300
}

const Header = ({ location }) => {
    //   const data = useStaticQuery(graphql`
    //     query BioQuery {
    //       site {
    //         siteMetadata {
    //           author {
    //             name
    //             summary
    //           }
    //           social {
    //             twitter
    //           }
    //         }
    //       }
    //     }
    //   `)

    //   // Set these values by editing "siteMetadata" in gatsby-config.js
    //   const author = data.site.siteMetadata?.author
    //   const social = data.site.siteMetadata?.social


    // const navbar = (
    //     <div>
    //         <Link className="navbar-link-about" to="/about">about</Link>
    //         {posts.map((post) => {
    //             const title = post.frontmatter.title || post.fields.slug

    //             return (<Link key={post.fields.slug} to={post.fields.slug}>{title}</Link>)
    //         })}
    //         <Link className="navbar-link-works" to="/works">works</Link>
    //         <Link className="navbar-link-logs" to="/logs">logs</Link>
    //     </div>
    // )
    const rootPath = `${__PATH_PREFIX__}/`
    const isRootPath = location.pathname === rootPath

    const items = [
        { name: 'profile', href: 'profile' },
        { name: 'info', href: 'info' },
        { name: 'works', href: 'works' },
        { name: 'logs', href: 'logs' },
    ];
    const links = [
        { name: 'mail', href: 'mailto:koma.keitamiyashita@gmail.com' },
        { name: 'twitter', href: 'http://twitter.com/internet_club2' },
        { name: 'instagram', href: 'http://instagram.com/koma12' },
        { name: 'github', href: 'http://github.com/koma-koma' },
        { name: 'youtube', href: 'https://www.youtube.com/channel/UCD473UcDGCulkyMBBmIeytQ' },
    ];


    return (
        <header style={navbarStyles} className="header">
            <Link to={!isRootPath && "/"} style={{ textDecoration: isRootPath && 'underline', opacity: isRootPath && 1 }}><h1 style={{ marginTop: '-4px', marginBottom: '32px', fontSize: '1.25rem', fontWeight: 500 }}>keitamiyashita.com</h1>
            </Link>
            <nav>
                <ul style={{ listStyle: "none" }}>
                    {items.map((item) => {
                        const isActive = location.pathname === rootPath + item.href + '/'
                        return (
                            <li style={{ margin: '8px 0' }} key={item.name}>
                                <Link to={!isActive && '/' + item.href} style={{ textDecoration: isActive && 'underline', opacity: isActive && 1 }}>{item.name}</Link>
                            </li>
                        )
                    })}
                </ul>
                <ul style={{ listStyle: "none", position: 'absolute', bottom: '32px' }}>
                    {links.map((link) => {
                        return (
                            <li style={{ fontSize: '0.9rem', margin: '8px 0 0 0' }} key={link.name}>
                                <Link target="_blank" to={link.href}>{link.name}</Link>
                            </li>
                        )
                    })}

                </ul>
            </nav>
        </header>
    )
}

export default Header