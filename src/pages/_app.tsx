import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import PlausibleProvider from 'next-plausible'
import type { AppProps } from 'next/app'
import { Public_Sans, Urbanist } from 'next/font/google'
import { WagmiConfig } from 'wagmi'

import { chains, wagmiClient } from '@/providers'
import '@/styles/style.scss'

const urbanist = Urbanist({ subsets: ['latin'] })
const publicSans = Public_Sans({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        :root {
          --font-fallback: system-ui, 'Helvetica Neue', sans-serif;
          --font-heading: ${urbanist.style.fontFamily}, var(--font-fallback);
          --font-body: ${publicSans.style.fontFamily}, var(--font-fallback);
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
