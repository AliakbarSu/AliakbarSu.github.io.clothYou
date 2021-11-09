import graphcmsClient, { gql } from '@/lib/graphcms-client'
import { ProductCardFragment } from '@/lib/graphql-fragments'

export const getAllProductsQuery = gql`
  query AllProductsQuery($locale: Locale!, $limit: Int) {
    productsConnection(locales: [$locale, en], first: $limit) {
      edges {
        node {
          ...ProductCardFragment
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }

  ${ProductCardFragment}
`

async function getAllProducts({ locale = 'en', limit = 1000 }) {
  const {
    productsConnection: { edges, pageInfo }
  } = await graphcmsClient.request(getAllProductsQuery, {
    locale,
    limit
  })

  return {
    products: edges.map((edge) => ({ ...edge.node })),
    pageInfo
  }
}

export default getAllProducts
