import { gql, request } from 'graphql-request'
import { Dispatch, FormEvent, SetStateAction } from 'react'

import { Attributes, TokenResponse } from './types'

export async function handleSubmit(
  e: FormEvent<HTMLFormElement>,
  setAddresses: Dispatch<SetStateAction<string[]>>
) {
  e.preventDefault()
  setAddresses([])
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
  const attributes = checked['Attributes'] as Attributes[]

  if (!daos) {
    throw new Error('Please select at least one DAO')
  }

  if (!attributes) {
    throw new Error('Please select at least one attribute')
  }

  const query = gql`
    query (
      $daos: [ID!]!
      $queryTokens: Boolean!
      $queryAuctions: Boolean!
      $queryProposals: Boolean!
      $queryVotes: Boolean!
    ) {
      tokens(where: { dao_in: $daos }) @include(if: $queryTokens) {
        owner
      }

      auctions(where: { dao_in: $daos, winner_not: null })
        @include(if: $queryAuctions) {
        winner
      }

      proposals(where: { dao_in: $daos }) @include(if: $queryProposals) {
        proposer
      }

      voteCastEvents(where: { dao_in: $daos }) @include(if: $queryVotes) {
        voter
      }
    }
  `

  const data = await request<TokenResponse>(
    'https://nouns-data.up.railway.app/graphql',
    query,
    {
      daos,
      queryTokens: attributes.includes('token-owner'),
      queryAuctions: attributes.includes('auction-winner'),
      queryProposals: attributes.includes('proposal-creator'),
      queryVotes: attributes.includes('voter'),
    }
  )

  if (!data) {
    throw new Error('No data found')
  }

  const addresses: string[] = []

  if (data.tokens) {
    const tokenAddresses = data.tokens.map((token) => token.owner)
    addresses.push(...tokenAddresses)
  }

  if (data.auctions) {
    const auctionAddresses = data.auctions.map((auction) => auction.winner)
    addresses.push(...auctionAddresses)
  }

  if (data.proposals) {
    const proposalAddresses = data.proposals.map(
      (proposal) => proposal.proposer
    )
    addresses.push(...proposalAddresses)
  }

  if (data.voteCastEvents) {
    const voteAddresses = data.voteCastEvents.map((vote) => vote.voter)
    addresses.push(...voteAddresses)
  }

  if (!addresses || addresses.length === 0) {
    setAddresses([])
    throw new Error('No addresses found')
  }

  const uniqueAddresses = new Set(addresses)
  setAddresses(Array.from(uniqueAddresses))
}
