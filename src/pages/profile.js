import * as React from "react"
import { graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

const lists = [
  {
    name: 'awards', list: [
      { key: 'ymaa', year: 2024, item: 'やまなしメディア芸術アワード2023-24入選', url: 'https://y-artaward.jp/' },
      { key: 'megei', year: 2022, item: '第25回文化庁メディア芸術祭 アート部門審査委員会推薦作品 選出', url: 'https://j-mediaarts.jp/award/art/' },
      { key: 'cgc26', year: 2021, item: '第26回学生CGコンテストアート部門 ノミネート', url: 'https://archive.campusgenius.jp/2020/art/' },
      { key: 'adaa', year: 2021, item: '2020年度Asia Digital Art Award優秀賞受賞', url: 'https://adaa.jp/ja/winners/winners2020.html' },
      { key: 'cgcon23', year: 2018, item: '第23回学生CGコンテストエンターテイメント部門ノミネート' },
    ]
  },
  {
    name: 'exhibition', list: [
      { key: 'ymaa2023-24', year: 2024.3, item: "やまなしメディア芸術アワード2023-24 入選作品展", url: 'https://y-artaward.jp/exhibition.php' },
      { key: 'ourlights', year: 2024.1, item: "わたしたちの光、おおらかなしるし | our lights, tolerant signs - EUREKA（福岡）", url: 'https://eurekafukuoka.com/2041/' },
      { key: 'threshold', year: 2023.8, item: "閾 / Threshold - 九州大学芸術工学図書館映像音響ラウンジ", url: 'https://www.design.kyushu-u.ac.jp/topics/18514/' },
      { key: 'icckids2022', year: 2022.7, item: "ICCキッズ・プログラム2022 Tools for Play どうぐをプレイする - NTTインターコミュニケーション・センター[ICC]", url: 'https://www.ntticc.or.jp/ja/exhibitions/2022/icc-kids-program-2022-tools-for-play/' },
      { key: 'solo2022', year: 2022.5, item: "個展 2人のパフォーマーのための通信規約 - 'meee' Gallery Tokyo" },
      { key: 'kioku', year: 2021.9, item: '記憶の織り目｜Memories Between Thread - Sta. (作品制作/展示設営)', url: 'https://www.tokyoartbeat.com/events/-/2021%2F572D' },
      { key: 'cgc26', year: 2021.3, item: 'CGC26 オンライン・ノミネート作品展' },
      { key: 'adaa', year: 2021.2, item: 'アジアデジタルアート大賞展FUKUOKA2019・2020合同受賞作品展' },
      { key: 'tmu2020', year: 2020.3, item: '首都大学東京インダストリアルアート学科・学域 卒業・修了制作展 2020' },
      { key: 'ISAF', year: 2017.12, item: 'インターカレッジ・ソニックアーツ・フェスティバル2017' },
      { key: 'tmu2017', year: 2017.3, item: '首都大学東京インダストリアルアート学科・学域 卒業・修了制作展 2017' },
    ]
  },
  {
    name: 'performance', list: [
      { key: 'freq2024', year: 2024.5, item: 'freq - 2405012（九州大学芸術工学部音響特殊棟、福岡）', url: 'https://freq-240512.peatix.com/' },
      { key: 'cyberturn4', year: 2024.2, item: 'サイバーターン4（Circus Tokyo、東京）', url: 'https://cyberturn.notion.site/e482f3fbc188434caaa9e15861600778?pvs=4' },
      { key: 'hertz2nd', year: 2023.11, item: 'hertz "2nd Anniversary"（Kieth Flack、福岡）', url: 'https://kiethflack.net/schedule/hertz-2nd-anniversary/' },
      { key: 'stain', year: 2023.5, item: 'ポール・デマリニス パフォーマンス＆トーク「stain」（九州大学芸術工学部音響特殊棟、福岡）', url: 'https://stain.peatix.com/' },
      { key: 'freq2023', year: 2023.2, item: 'freq 2023 - メディア・テクノロジーから生まれる音 - （九州大学芸術工学部音響特殊棟、福岡）', url: 'https://freq2023.peatix.com/' },
      { key: 'permian', year: 2022.4, item: 'trio - miyashita keita, takara mahaya, Akio James - （Permian、東京）' },
      { key: 'nxpc', year: 2022.3, item: 'NxPC.Live vol.54 "密" HISOKA（オンライン）', url: 'https://nxpclab.info/vol.54/' }
    ]
  },
  {
    name: 'education', list: [
      { key: 'master', year: 2020.3, item: '首都大学東京（現東京都立大学）大学院システムデザイン研究科インダストリアルアート学域修了' },
      { key: 'bacheler', year: 2017.3, item: '首都大学東京（現東京都立大学）システムデザイン学部インダストリアルアートコース卒業' }
    ]
  },
  {
    name: 'work', list: [
      { key: 'ycam', year: '2024.5-', item: '　　　　山口情報芸術センター[YCAM]' },
      { key: 'kyu-dai', year: '2022.6-2024.5', item: '　　　　九州大学芸術工学研究院テクニカルスタッフ' },
    ]
  },
  // {
  //   name: 'client work', list: [
  //     { key: 'kyu-dai', year: '2022.6-', item: '九州大学芸術工学研究院テクニカルスタッフ' },
  //   ]
  // },
]

const Profile = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="profile" />
      <StaticImage src="../images/Screen Shot 2023-03-18 at 14.18.33.png" alt="profile image" width={720} />
      <h1 style={{ margin: '16px 0 0 0', fontSize: '1rem' }}>
        KEITA Miyashita | 宮下恵太
      </h1>
      <h2 style={{ margin: '8px 0 0 0', fontSize: '0.9rem', fontWeight: 500 }}>artist / engineer / improviser</h2>
      <p style={{ marginTop: '12px', fontSize: '0.8rem' }}>
        北海道生まれ、山口市在住。<br/>
        電気・情報・通信といった今日的なテクノロジーと人間との関係性を軸に作品制作を行う。ギターやスピーカ、ミキサーなどを用いた実験的な即興演奏活動等も行っている。<br/>
        第25回文化庁メディア芸術祭にて音による通信装置を用いた作品「BEAT/BIT」がアート部門審査委員会推薦作品に選出(2022)。主な展示として個展「わたしたちの光、おおらかなしるし | our lights, tolerant signs」（EUREKA、福岡、2024）、グループ展「ICCキッズ・プログラム2022 Tools for Play どうぐをプレイする」(NTTインターコミュニケーション・センター[ICC]、東京、2022)など。
      </p>
      <p style={{ marginTop: '12px', fontSize: '0.8rem' }}>
        Born in Hokkaido, currently based in Yamaguchi, Japan.<br/>
        His work explores the relationship between contemporary technologies—such as electricity, information, and communication—and human experience. He is also active in experimental improvisation using guitars, speakers, mixers, and other equipment.<br/>
        His work BEAT/BIT, a sound-based communication device, was selected as a Jury Selection in the Art Division of the 25th Japan Media Arts Festival (2022).
Notable exhibitions include the solo show our lights, tolerant signs (EUREKA, Fukuoka, 2024) and the group exhibition ICC Kids Program 2022: Tools for Play (NTT InterCommunication Center [ICC], Tokyo, 2022).
      </p>
      {
        lists.map((list) => {
          return (
            <>
              <h2 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '0px' }}>{list.name}</h2>
              <ul style={{ fontSize: '0.8rem', listStyle: 'none', marginTop: '12px' }}>
                {
                  list.list.map((item) => {
                    const desc = <span style={{ marginLeft: '56px' }}>{item.item}</span>
                    return (
                      <li key={item.key} style={{ margin: '4px 0' }}>
                        <span style={{ position: 'absolute', fontWeight: 500 }}>{item.year}</span>
                        {item.url ? <a target="_blank" href={item.url} >{desc}</a> : desc}
                      </li>
                    )
                  })
                }
              </ul>
            </>)
        })}
    </Layout>
  )
}

export default Profile

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(filter: { fields: { collection: { eq: "about" } } }) {
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
