import { ENS } from '@ensdomains/ensjs'
import { useEffect, useState } from 'react'

import { breakIntoChunks, truncateAddress } from '@/utils'

import { jsonProvider } from '../providers'

const ENSInstance = new ENS()

export function useEnsNames(addresses?: string[]) {
  const [names, setNames] = useState<string[]>([])

  useEffect(() => {
    async function fetchEnsNames() {
      if (!addresses || addresses.length === 0) return
      await ENSInstance.setProvider(jsonProvider)

      const batches = breakIntoChunks(100, addresses)

      const results = []
      for (const batch of batches) {
        const batched = await ENSInstance.batch(
          ...batch.map((address) => ENSInstance.getName.batch(address))
        )
        results.push(batched)
      }

      const flattened = results.flat()
      const names = flattened.map(
        (name, i) => name?.name || truncateAddress(addresses[i])
      )
      setNames(names)
    }

    fetchEnsNames()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addresses])

  return names
}
