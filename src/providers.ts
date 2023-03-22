import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createClient } from 'wagmi'
import { goerli, mainnet } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'

export const { chains, provider } = configureChains(
  [mainnet, goerli],
  [publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: 'Web3 Starter',
  chains,
})

export const wagmiClientConfig = {
  autoConnect: true,
  connectors,
  provider,
}

export const wagmiClient = createClient(wagmiClientConfig)
