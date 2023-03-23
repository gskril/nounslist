import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import styled from 'styled-components'

import { Row } from '@/components/Row'
import { Button, Container, Heading } from '@/components/atoms'
import { handleSubmit } from '@/handler'

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

const Results = styled.div`
  width: 100%;
  padding: 1rem;
  position: relative;
  border-radius: 0.625rem;
  border: 0.09375rem solid var(--color-slate8);
  overflow: scroll;

  .result-count {
    position: absolute;
    right: 1rem;
    top: -1.5rem;
  }

  table {
    width: 100%;
    border-collapse: collapse;

    tr {
      /* header row */
      &:nth-child(1) {
        border-bottom: 0.09375rem solid var(--color-slate5);

        th {
          text-align: left;
          padding-bottom: 0.375rem;

          &:last-child {
            min-width: 10rem;
          }
        }
      }

      /* first row of data */
      &:nth-child(2) {
        td {
          padding-top: 0.75rem;
        }
      }
    }

    th,
    td {
      padding: 0.5rem 3rem 0.5rem 1rem;
    }
  }
`

export default function Home() {
  const [addresses, setAddresses] = useState<string[]>([
    '0x179A862703a4adfb29896552DF9e307980D19285',
    '0xb8c2C29ee19D8307cb7255e1Cd9CbDE883A267d5',
    '0x179A862703a4adfb29896552DF9e307980D19285',
    '0xb8c2C29ee19D8307cb7255e1Cd9CbDE883A267d5',
    '0x179A862703a4adfb29896552DF9e307980D19285',
    '0xb8c2C29ee19D8307cb7255e1Cd9CbDE883A267d5',
    '0x179A862703a4adfb29896552DF9e307980D19285',
    '0xb8c2C29ee19D8307cb7255e1Cd9CbDE883A267d5',
    '0x179A862703a4adfb29896552DF9e307980D19285',
    '0xb8c2C29ee19D8307cb7255e1Cd9CbDE883A267d5',
  ])

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
              <Link
                href="https://nouns-data.up.railway.app/graphql"
                target="_blank"
                rel="noopener"
              >
                Nounish API
              </Link>
            </span>
          </Header>

          <Form onSubmit={async (e) => await handleSubmit(e, setAddresses)}>
            <Row
              name="DAOs"
              options={['All', 'Nouns', 'Lil Nouns', 'Gnars', 'Builder']}
            />

            <Row
              name="Attributes"
              options={[
                'Owner',
                'Won an auction',
                'Created a proposal',
                'Voted onchain',
              ]}
            />

            <Button type="submit" style={{ marginTop: '0.5rem' }}>
              Generate allowlist
            </Button>
          </Form>

          {addresses && (
            <Results>
              <span className="result-count">
                {addresses.length} addresses found
              </span>

              <table>
                <tr>
                  <th>Address</th>
                  <th>ENS Name</th>
                </tr>
                {addresses.map((address) => (
                  <tr key={address}>
                    <td>{address}</td>
                    <td>TODO</td>
                  </tr>
                ))}
              </table>
            </Results>
          )}
        </Layout>
      </Container>
    </>
  )
}
