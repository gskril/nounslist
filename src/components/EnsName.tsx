import { useEnsName } from 'wagmi'

export const EnsName = ({ address }: { address: string | undefined }) => {
  const { data } = useEnsName({
    address: address as `0x${string}`,
    chainId: 1,
  })

  const result = data ? data : address?.slice(0, 6) + '...' + address?.slice(-4)

  return <>{result}</>
}
