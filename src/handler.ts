import { gql, request } from 'graphql-request'
import { Dispatch, FormEvent, SetStateAction } from 'react'

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
  setAddresses: Dispatch<SetStateAction<string[]>>
) {
  e.preventDefault()

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

  const data = await request<TokenResponse>(
    'https://nouns-data.up.railway.app/graphql',
    query
  )

  const addresses = data.tokens.map((token) => token.owner)
  setAddresses(addresses)
}
