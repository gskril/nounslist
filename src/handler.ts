import { gql, request } from 'graphql-request'
import { Dispatch, FormEvent, SetStateAction } from 'react'
import toast from 'react-hot-toast'

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
  const formData = new FormData(e.currentTarget)
  const entries = Array.from(formData.entries())

  const checked = entries.reduce((acc, curr) => {
    const [key, value] = curr as [string, string]
    if (acc[key]) {
      acc[key].push(value)
    } else {
      acc[key] = [value]
    }
    return acc
  }, {} as { [key: string]: string[] })

  const daos = checked['DAOs']
  const attributes = checked['Attributes']

  if (!daos || daos.length === 0) {
    throw new Error('Please select at least one DAO')
  }

  const query = gql`
    query ($daos: [ID!]!) {
      tokens(
        where: { dao_in: $daos }
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
    query,
    {
      daos,
    }
  )

  const addresses = data.tokens.map((token) => token.owner)
  const uniqueAddresses = new Set(addresses)
  setAddresses(Array.from(uniqueAddresses))
}
