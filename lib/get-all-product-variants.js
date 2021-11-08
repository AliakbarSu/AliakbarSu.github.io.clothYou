import graphcmsClient, { gql } from '@/lib/graphcms-client'

export const getAllProductVariantsQuery = gql`
  query AllProductVariantsQuery($locale: Locale!) {
    productSizeVariants(locales: [$locale, en]) {
      name
      size
      id
    }
    productColorVariants(locales: [$locale, en]) {
      name
      id
      color
    }
    products {
      price
    }
  }
`

async function getAllProductVariants({ locale = 'en' }) {
  const { productSizeVariants, productColorVariants, products } =
    await graphcmsClient.request(getAllProductVariantsQuery, {
      locale
    })

  return {
    productSizeVariants,
    productColorVariants,
    products
  }
}

export default getAllProductVariants
