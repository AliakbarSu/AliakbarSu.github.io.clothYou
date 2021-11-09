import ProductCard from '@/components/product-card'
import { useSettingsContext } from '@/context/settings'
import classNames from '@/utils/class-name'

function ProductGrid({ products, className = '' }) {
  const { activeCurrency } = useSettingsContext()
  return (
    <div
      className={classNames(
        'gap-8 grid sm:grid-cols-3 lg:grid-cols-6',
        className
      )}
    >
      {products.map((pr) => ProductCard({ ...pr, activeCurrency }))}
    </div>
  )
}

export default ProductGrid
