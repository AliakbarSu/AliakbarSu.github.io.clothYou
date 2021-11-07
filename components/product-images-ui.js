import * as React from 'react'
import Image from 'next/image'

const ProductImageUi = ({ images, name, onClick, activeImage }) => {
  const onImageClickHandler = (image) => {
    onClick(image)
  }

  const isActive = (imageId) => {
    return activeImage.id == imageId
  }

  return (
    <div className="flex flex-wrap">
      {images.map((img) => (
        <div
          className={[
            'cursor-pointer border-2 mr-1 hover:border-blue-300 rounded-md',
            isActive(img.id) ? 'border-blue-300' : ''
          ].join(' ')}
          onClick={() => onImageClickHandler(img)}
        >
          <Image
            src={img.url}
            key={img.id}
            height="80"
            width="80"
            alt={name}
            title={name}
          />
        </div>
      ))}
    </div>
  )
}

export default ProductImageUi
