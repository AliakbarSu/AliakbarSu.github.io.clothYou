import React, { useContext } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { ThemeContext } from 'providers/ThemeProvider'
import { Container, Card, TitleWrap } from 'components/common'
import Star from 'components/common/Icons/Star'
import Fork from 'components/common/Icons/Fork'
import {
  Wrapper,
  Grid,
  Item,
  Content,
  Stats,
  Languages,
  SocialPreview,
  SocialPreviewWrapper
} from './styles'

// export const Projects = () => <Wrapper>Test</Wrapper>;
export const Items = () => {
  const { theme } = useContext(ThemeContext)
  // const {
  //   github: {
  //     viewer: {
  //       pinnedItems: { edges }
  //     }
  //   }
  // } = useStaticQuery(
  //   graphql`
  //     {
  //       github {
  //         viewer {
  //           pinnedItems(first: 10) {
  //             edges {
  //               node {
  //                 ... on GitHub_Repository {
  //                   id
  //                   name
  //                   url
  //                   description
  //                   stargazers {
  //                     totalCount
  //                   }
  //                   forkCount
  //                   openGraphImageUrl
  //                   languages(first: 3) {
  //                     nodes {
  //                       id
  //                       name
  //                     }
  //                   }
  //                 }
  //               }
  //             }
  //           }
  //         }
  //       }
  //     }
  //   `
  // )
  return (
    <Wrapper as={Container} id="items">
      <h2>Items</h2>
      <Grid>
        {/* {edges.map(({ node }) => (
          <Item
            key={node.id}
            as="a"
            href={node.url}
            target="_blank"
            rel="noopener noreferrer"
            theme={theme}
          >
            <Card theme={theme}>
              <SocialPreviewWrapper>
                <SocialPreview src={node.openGraphImageUrl} />
              </SocialPreviewWrapper>
              <Content>
                <h4>{node.name}</h4>
                <p>{node.description}</p>
              </Content>
              <TitleWrap>
                <Stats theme={theme}>
                  <div>
                    <Star color={theme === 'light' ? '#000' : '#fff'} />
                    <span>{node.stargazers.totalCount}</span>
                  </div>
                  <div>
                    <Fork color={theme === 'light' ? '#000' : '#fff'} />
                    <span>{node.forkCount}</span>
                  </div>
                </Stats>
                <Stats theme={theme}>
                  <Languages>
                    {node.languages.nodes.map(({ id, name }) => (
                      <span key={id}>{name}</span>
                    ))}
                  </Languages>
                </Stats>
              </TitleWrap>
            </Card>
          </Item>
        ))} */}
      </Grid>
    </Wrapper>
  )
}
