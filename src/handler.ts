import { gql, request } from 'graphql-request'
import { Dispatch, FormEvent, SetStateAction } from 'react'

import { Status } from './types'

type TokenResponse = {
  tokens: {
    dao: {
      id: string
      name: string
    }
    owner: string
    tokenId: number
  }[]
}

export async function handleSubmit(
  e: FormEvent<HTMLFormElement>,
  setAddresses: Dispatch<SetStateAction<string[]>>,
  setStatus: Dispatch<SetStateAction<Status>>
) {
  e.preventDefault()
  setStatus('loading')

  const query = gql`
    {
      tokens(
        where: { dao: "0x9c8ff314c9bc7f6e59a9d9225fb22946427edc03" }
        orderBy: "tokenId"
        orderDirection: "desc"
      ) {
        dao {
          name
        }
        tokenId
        owner
      }
    }
  `

  try {
    const data = await request<TokenResponse>(
      'https://nouns-data.up.railway.app/graphql',
      query
    )

    const addresses = data.tokens.map((token) => token.owner)
    const uniqueAddresses = new Set(addresses)
    setAddresses(Array.from(uniqueAddresses))
    setStatus('success')
  } catch (error) {
    console.error('Error generating allowlist', error)
    setStatus('error')
  }
}
