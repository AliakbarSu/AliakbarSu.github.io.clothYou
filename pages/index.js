import * as React from 'react'
import getAllProducts from '@/lib/get-all-products'
import getPageData from '@/lib/get-page-data'
import ProductGrid from '@/components/product-grid'
import FiltersPopup from '@/components/filters-popup'
import { useModalContext } from '@/context/modal'

function IndexPage({ products }) {
  const [filteredProducts, setFilteredProducts] = React.useState([...products])
  const { modalState, setModalState } = useModalContext()

  const is_color_in_colors = (color, colors) => {
    const updatedColor = color.map((s) => s.toUpperCase())
    const updatedColors = colors.map((s) => s.toUpperCase())
    return colors.length
      ? updatedColors.some((r) => updatedColor.indexOf(r) >= 0)
      : true
  }

  const is_size_in_sizes = (size, sizes) => {
    const updatedSize = size.map((s) => s.toUpperCase())
    const updatedSizes = sizes.map((s) => s.toUpperCase())
    return sizes.length
      ? updatedSizes.some((r) => updatedSize.indexOf(r) >= 0)
      : true
  }

  const is_price_within_range = (price, min, max) => {
    if (!price || price == 0 || (min == 0 && max == 0)) {
      return true
    }
    return price >= min && price <= max
  }

  const onFiltersApplyHandler = ({ color, size, price: { min, max } }) => {
    const colorsInFilters = color
    const sizesInFilters = size

    const updatedProducts = products.filter((pr) => {
      const colors = pr.variants.map((vr) => vr.name)
      const sizes = pr.variants.map((vr) => vr.name)
      const colorCondition = is_color_in_colors(colors, colorsInFilters)
      const sizeCondition = is_size_in_sizes(sizes, sizesInFilters)
      const priceCondition = is_price_within_range(pr.price, min, max)
      return colorCondition && sizeCondition && priceCondition
    })

    setFilteredProducts(updatedProducts)
  }

  return (
    <React.Fragment>
      <FiltersPopup
        show={modalState}
        onClose={() => setModalState(false)}
        onApply={onFiltersApplyHandler}
      />

      <ProductGrid products={filteredProducts} />
    </React.Fragment>
  )
}

export async function getStaticProps({ locale }) {
  const pageData = await getPageData({ locale })
  const { products } = await getAllProducts({ locale })

  return {
    props: { ...pageData, products }
  }
}

export default IndexPage
