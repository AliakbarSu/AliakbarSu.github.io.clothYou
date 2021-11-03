const description = 'A place to exchange your old cloth for new one.'
const title = 'A place to exchange your old cloth for new one.'
const url = 'https://clothyou.co.nz'

const seo = {
  title,
  titleTemplate: '%s | Cloth You',
  description,
  openGraph: {
    description,
    title,
    type: 'website',
    url
  },
  twitter: {
    handle: '@ClothYou',
    site: '@ClothYou'
  }
}

export { seo as defaultSeo, url as defaultUrl }
