import * as React from 'react'
import getAllProducts from '@/lib/get-all-products'
import getPageData from '@/lib/get-page-data'
import ProductGrid from '@/components/product-grid'
import FiltersPopup from '@/components/filters-popup'
import { useModalContext } from '@/context/modal'

function IndexPage({ products }) {
  const { modalState, setModalState } = useModalContext()
  const onFiltersApplyHandler = (filters) => {
    console.log(filters)
  }
  return (
    <React.Fragment>
      {modalState && (
        <FiltersPopup
          onClose={() => setModalState(false)}
          onApply={onFiltersApplyHandler}
        />
      )}
      <ProductGrid products={products} />
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
