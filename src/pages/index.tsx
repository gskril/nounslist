import Head from 'next/head'
import Link from 'next/link'
import styled from 'styled-components'

import { Row } from '@/components/Row'
import { Button, Container, Heading } from '@/components/atoms'

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding-top: 4rem;
  padding-bottom: 4rem;
`

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-weight: 700;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export default function Home() {
  return (
    <>
      <Head>
        <title>Web3 Starter</title>
        <meta name="description" content="" />

        <meta property="og:image" content="" />
        <meta property="og:title" content="" />
        <meta property="og:description" content="" />
      </Head>

      <Container as="main">
        <Layout>
          <Header>
            <Heading>Create allowlists from the Nouns ecosystem</Heading>
            <span>
              Powered by{' '}
              <Link href="https://gregskril.com" target="_blank" rel="noopener">
                Nounish API
              </Link>
            </span>
          </Header>

          <Form onSubmit={(e) => e.preventDefault()}>
            <Row
              name="DAOs"
              options={['All', 'Nouns', 'Lil Nouns', 'Gnars', 'Builder']}
            />

            <Row
              name="Actions"
              options={[
                'Won an auction',
                'Created a proposal',
                'Voted onchain',
              ]}
            />

            <Button type="submit" style={{ marginTop: '0.5rem' }}>
              Generate allowlist
            </Button>
          </Form>

          <div className="results">
            <p>hi</p>
          </div>
        </Layout>
      </Container>
    </>
  )
}
