import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import PlausibleProvider from 'next-plausible'
import type { AppProps } from 'next/app'
import { Londrina_Solid, Public_Sans } from 'next/font/google'
import localFont from 'next/font/local'
import { WagmiConfig } from 'wagmi'

import { chains, wagmiClient } from '@/providers'
import '@/styles/style.scss'

const ptRoot = localFont({ src: '..//assets/pt-root-ui_vf.ttf' })
const londrina = Londrina_Solid({
  subsets: ['latin'],
  weight: ['300', '400'],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        :root {
          --font-fallback: system-ui, 'Helvetica Neue', sans-serif;
          --font-heading: ${londrina.style.fontFamily}, var(--font-fallback);
          --font-body: ${ptRoot.style.fontFamily}, var(--font-fallback);
        }
      `}</style>

      <PlausibleProvider domain="example.com" trackOutboundLinks>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider chains={chains} modalSize="compact">
            <Component {...pageProps} />
          </RainbowKitProvider>
        </WagmiConfig>
      </PlausibleProvider>
    </>
  )
}
