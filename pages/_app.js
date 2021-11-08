import { CartProvider } from 'react-use-cart'

import 'tailwindcss/tailwind.css'

import { SettingsProvider } from '@/context/settings'
import { ModalProvider } from '@/context/modal'
import Layout from '@/components/layout'

function App({ Component, pageProps }) {
  return (
    <SettingsProvider>
      <CartProvider>
        <ModalProvider>
          <Layout {...pageProps}>
            <Component {...pageProps} />
          </Layout>
        </ModalProvider>
      </CartProvider>
    </SettingsProvider>
  )
}

export default App
