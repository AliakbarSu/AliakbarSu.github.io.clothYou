import ProductCard from '@/components/product-card'

function ProductGrid({ products }) {
  return (
    <div className="gap-8 grid sm:grid-cols-3 lg:grid-cols-6">
      {products.map(ProductCard)}
    </div>
  )
}

export default ProductGrid
