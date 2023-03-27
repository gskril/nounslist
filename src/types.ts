type DAO = {
  id: string
  name: string
}

export type TokenResponse = {
  tokens?: {
    dao: DAO
    owner: string
    tokenId: number
  }[]
  auctions?: {
    dao: DAO
    winner: string
    tokenId: number
  }[]
  proposals?: {
    dao: DAO
    proposer: string
    proposalId: number
  }[]
  voteCastEvents?: {
    dao: DAO
    voter: string
    proposalId: number
  }[]
}

export type Attributes =
  | 'token-owner'
  | 'auction-winner'
  | 'proposal-creator'
  | 'voter'
