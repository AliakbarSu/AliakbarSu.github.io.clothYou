import Link from 'next/link'
import { useCart } from 'react-use-cart'
import * as React from 'react'
import Image from 'next/image'

import { formatCurrencyValue } from '@/utils/format-currency-value'
import { GraphCMSSVG } from '@/svgs'
import { ShoppingCartIcon } from '@/icons'
import { useSettingsContext } from '@/context/settings'
import 'animate.css'

function Header({ pages = [] }) {
  const { cartTotal } = useCart()
  const { activeCurrency } = useSettingsContext()
  const [navOpen, setNavOpen] = React.useState(false)

  const toggleNavHandler = () => {
    setNavOpen((navState) => !navState)
  }
  return (
    <React.Fragment>
      <header className="max-w-7xl mx-auto bg-white flex-grow flex items-center justify-between px-4 sm:px-6">
        <div className="pt-6 w-full">
          <nav className="grid grid-cols-12">
            <div className="col-span-1 row-span-1 flex items-end">
              <GraphCMSSVG
                onClick={toggleNavHandler}
                className="h-auto text-primary w-5 cursor-pointer"
              />
            </div>

            <div className="col-span-4 row-span-1 flex items-start">
              <Link href="/">
                <a>
                  <Image
                    src="/images/logo.png"
                    width="165"
                    height="60"
                    className="cursor-pointer"
                  />
                </a>
              </Link>
            </div>

            <div className="col-start-10 col-span-3 row-span-1 flex items-end justify-center">
              <Link href="/cart">
                <a className="flex space-x-2">
                  <ShoppingCartIcon
                    className="h-6 w-6 text-gray-400"
                    aria-hidden="true"
                  />
                  <span className="text-gray-900">
                    {formatCurrencyValue({
                      currency: activeCurrency,
                      value: cartTotal
                    })}
                  </span>
                </a>
              </Link>
            </div>

            <ul
              className={[
                'col-span-12 row-span-1 row-start-2 flex flex-wrap pt-3 md:flex',
                navOpen ? '' : 'hidden'
              ].join(' ')}
            >
              {pages.map((page) => (
                <li
                  key={page.id}
                  className="block py-4 mt-1 md:inline-block md:my-0 w-6/12 md:w-3/12 text-center animate__animated animate__fadeInDown border-t-2 border-solid border-gray-100 md:border-0"
                >
                  <Link href={`/${page.type.toLowerCase()}/${page.slug}`}>
                    <a className="text-lightgray hover:text-slategray hover:bg-gainsboro rounded-full py-2 px-3 font-medium">
                      {page.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
      <div className="p-3 mb-5 mt-3 bg-blue-200"></div>
    </React.Fragment>
  )
}

export default Header
