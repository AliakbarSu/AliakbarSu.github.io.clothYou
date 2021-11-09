import * as React from 'react'
import getAllProducts from '@/lib/get-all-products'
import getPageData from '@/lib/get-page-data'
import ProductGrid from '@/components/product-grid'
import FiltersPopup from '@/components/filters-popup'
import { useModalContext } from '@/context/modal'
import Pagination from '@/components/ui/pagination'

function IndexPage({ products }) {
  const ITEMS_PER_PAGE = 25
  const split_products_into_pages = (allProducts, itemsPerPage) => {
    let ch = 0
    return allProducts.reduce(
      (all, one) => {
        if (all[ch].length > itemsPerPage - 1) {
          ch++
          all[ch] = [].concat([], one)
        } else {
          all[ch] = [].concat(all[ch], one)
        }
        return all
      },
      [[]]
    )
  }

  const { modalState, setModalState } = useModalContext()
  const [activePage, setActivePage] = React.useState(0)
  const [filteredProducts, setFilteredProducts] = React.useState(
    split_products_into_pages([...products], ITEMS_PER_PAGE)
  )

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

  const is_page_active = (index) => {
    return index == activePage
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

    setFilteredProducts(
      split_products_into_pages(updatedProducts, ITEMS_PER_PAGE)
    )
  }

  return (
    <React.Fragment>
      <FiltersPopup
        show={modalState}
        onClose={() => setModalState(false)}
        onApply={onFiltersApplyHandler}
      />
      {filteredProducts.map((prods, page) => (
        <ProductGrid
          className={is_page_active(page) ? '' : 'sr-only'}
          key={page}
          products={prods}
        />
      ))}
      <div className="mt-8">
        <Pagination
          pages={filteredProducts}
          onSwithPage={setActivePage}
          activePage={activePage}
        />
      </div>
    </React.Fragment>
  )
}

export async function getStaticProps({ locale }) {
  const pageData = await getPageData({ locale })
  const { products, pageInfo } = await getAllProducts({ locale, limit: 100 })

  return {
    props: { ...pageData, products, pageInfo }
  }
}

export default IndexPage
