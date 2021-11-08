import { Fragment, useEffect, useState } from 'react'
import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import DropdownSelector from './ui/dropdown-selector'
import { formatCurrencyValue } from '@/utils/format-currency-value'
import { useSettingsContext } from '@/context/settings'
import { XIcon } from '@heroicons/react/solid'
import getAllProductVariants from '@/lib/get-all-product-variants'
import create_price_range from '@/utils/create-range'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function FiltersPopup({ show, onClose, onApply }) {
  const [selectedColors, setSelectedColors] = useState([])
  const [selectedSizes, setSelectedSizes] = useState([])
  const [price, setPrice] = useState({
    min: 0,
    max: 0
  })
  const { activeCurrency } = useSettingsContext()
  const [productVariants, setProductVariants] = useState({
    colors: [],
    sizes: [],
    prices: [100, 100, 100, 1000]
  })

  const remove_dublicates_variants = (array) => {
    return array.filter((item, pos) => {
      return array.map(({ name }) => name).indexOf(item.name) == pos
    })
  }

  useEffect(async () => {
    const { productColorVariants, productSizeVariants, products } =
      await getAllProductVariants({})

    const productPrices = products.map((pr) => pr.price).sort()
    const priceMin = productPrices[0]
    const priceMax = productPrices[productPrices.length - 1]
    setProductVariants({
      colors: remove_dublicates_variants(productColorVariants),
      sizes: remove_dublicates_variants(productSizeVariants),
      prices: create_price_range(priceMin, priceMax, 1000)
    })
  }, [])

  const setMinPrice = (minPrice) => {
    setPrice((state) => ({ ...state, min: minPrice }))
  }

  const setMaxPrice = (maxPrice) => {
    setPrice((state) => ({ ...state, max: maxPrice }))
  }

  const isItemInArray = (item, selections) => {
    return selections.find((sItem) => sItem.toUpperCase() == item.toUpperCase())
  }

  const selectColor = (color) => {
    const itemAlreadyExists = isItemInArray(color, selectedColors)
    if (itemAlreadyExists) {
      setSelectedColors((state) =>
        state.filter((cl) => cl.toUpperCase() !== color.toUpperCase())
      )
    } else {
      setSelectedColors((state) => [...state, color])
    }
  }

  const selectSize = (size) => {
    const itemAlreadyExists = isItemInArray(size, selectedSizes)
    if (itemAlreadyExists) {
      setSelectedSizes((state) =>
        state.filter((cl) => cl.toUpperCase() !== size.toUpperCase())
      )
    } else {
      setSelectedSizes((state) => [...state, size])
    }
  }

  const onSubmitHandler = (event) => {
    event.preventDefault()
    onApply({
      color: selectedColors,
      size: selectedSizes,
      price: price
    })
  }

  const onClearFiltersHandler = (event) => {
    setSelectedSizes([])
    setSelectedColors([])
    setPrice({ min: 0, max: 0 })
    onApply({
      color: [],
      size: [],
      price: { min: 0, max: 0 }
    })
  }

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={onClose}
      >
        <div
          className="flex min-h-screen text-center md:block md:px-2 lg:px-4"
          style={{ fontSize: 0 }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="hidden fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity md:block" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden md:inline-block md:align-middle md:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            enterTo="opacity-100 translate-y-0 md:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 md:scale-100"
            leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
          >
            <div className="flex text-base text-left transform transition w-full md:inline-block md:max-w-2xl md:px-4 md:my-8 md:align-middle lg:max-w-4xl">
              <div className="w-full relative flex items-center bg-white px-4 pb-8 overflow-hidden shadow-2xl sm:px-6 sm:pt-3 md:p-6 lg:p-8">
                <button
                  type="button"
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                  onClick={onClose}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                <div className="w-full grid grid-cols-1 gap-y-8 gap-x-6 items-start sm:grid-cols-12 lg:gap-x-8">
                  <div className="sm:col-span-12 lg:col-span-12">
                    <section aria-labelledby="options-heading">
                      <h3 id="options-heading" className="sr-only">
                        Product options
                      </h3>

                      <form onSubmit={onSubmitHandler}>
                        <div className="flex flex-wrap justify-between">
                          <h4 className="text-sm text-gray-900 font-medium w-full mb-2">
                            Prices
                          </h4>

                          <div className="w-5/12">
                            <h2 className="text-sm text-gray-900 font-medium">
                              Min Price
                            </h2>
                            <DropdownSelector
                              options={productVariants.prices.map((pr) => ({
                                display: formatCurrencyValue({
                                  currency: activeCurrency,
                                  value: pr
                                }),
                                value: pr
                              }))}
                              onSelect={setMinPrice}
                            />
                          </div>
                          <div className="w-5/12">
                            <h2 className="text-sm text-gray-900 font-medium">
                              Max Price
                            </h2>
                            <DropdownSelector
                              options={productVariants.prices.map((pr) => ({
                                display: formatCurrencyValue({
                                  currency: activeCurrency,
                                  value: pr
                                }),
                                value: pr
                              }))}
                              onSelect={setMaxPrice}
                            />
                          </div>
                        </div>
                        <div className="mt-8">
                          <h4 className="text-sm text-gray-900 font-medium">
                            Color
                          </h4>

                          <RadioGroup
                            // value={selectedColor}
                            onChange={selectColor}
                            className="mt-4"
                          >
                            <RadioGroup.Label className="sr-only">
                              Choose a color
                            </RadioGroup.Label>
                            <div className="flex items-center space-x-3">
                              {productVariants.colors.map((color) => (
                                <RadioGroup.Option
                                  key={color.id}
                                  value={color.name}
                                  className={classNames(
                                    `bg-${color.color.toLowerCase()}-500`,
                                    `bg-${color.color.toLowerCase()}`,
                                    isItemInArray(color.name, selectedColors)
                                      ? 'ring ring-offset-2'
                                      : '',
                                    !isItemInArray(color.name, selectedColors)
                                      ? 'ring-1'
                                      : '',
                                    '-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none'
                                  )}
                                >
                                  <RadioGroup.Label as="p" className="sr-only">
                                    {color.name}
                                  </RadioGroup.Label>
                                  <span
                                    aria-hidden="true"
                                    className={classNames(
                                      `bg-${color.color.toLowerCase()}-500`,
                                      `bg-${color.color.toLowerCase()}`,
                                      'h-8 w-8 border border-black border-opacity-10 rounded-full'
                                    )}
                                  />
                                </RadioGroup.Option>
                              ))}
                            </div>
                          </RadioGroup>
                        </div>

                        {/* Sizes */}
                        <div className="mt-10">
                          {/* <div className="flex items-center justify-between">
                            <h4 className="text-sm text-gray-900 font-medium">
                              Size
                            </h4>
                            <a
                              href="#"
                              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              Size guide
                            </a>
                          </div> */}

                          <RadioGroup
                            // value={selectedSizes}
                            onChange={selectSize}
                            className="mt-4"
                          >
                            <RadioGroup.Label className="sr-only">
                              Choose a size
                            </RadioGroup.Label>
                            <div className="grid grid-cols-4 gap-4">
                              {productVariants.sizes.map((size) => (
                                <RadioGroup.Option
                                  key={size.id}
                                  value={size.name}
                                  className={classNames(
                                    'bg-white shadow-sm text-gray-900 cursor-pointer',
                                    isItemInArray(size.name, selectedSizes)
                                      ? 'ring-2 ring-indigo-500'
                                      : '',
                                    'group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1'
                                  )}
                                >
                                  {({ checked }) => (
                                    <>
                                      <RadioGroup.Label as="p">
                                        {size.name}
                                      </RadioGroup.Label>

                                      <div
                                        className={classNames(
                                          isItemInArray(
                                            size.name,
                                            selectedSizes
                                          )
                                            ? 'border'
                                            : 'border-2',
                                          checked
                                            ? 'border-indigo-500'
                                            : 'border-transparent',
                                          'absolute -inset-px rounded-md pointer-events-none'
                                        )}
                                        aria-hidden="true"
                                      />
                                    </>
                                  )}
                                </RadioGroup.Option>
                              ))}
                            </div>
                          </RadioGroup>
                        </div>

                        <button
                          type="submit"
                          className="mt-6 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Apply Filters
                        </button>
                        <button
                          type="button"
                          onClick={onClearFiltersHandler}
                          className="mt-6 w-full border-indigo-600 bg-white text-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium hover:text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Clear Filters
                        </button>
                      </form>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
