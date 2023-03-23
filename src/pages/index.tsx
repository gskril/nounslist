import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { EnsName } from '@/components/EnsName'
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

const ResultsWrapper = styled.div`
  .result-count {
    display: block;
    text-align: right;
    padding: 0 0.875rem 0.25rem;
  }

  .results {
    width: 100%;
    padding: 1rem;
    max-height: 25rem;
    position: relative;
    border-radius: 0.625rem;
    border: 0.09375rem solid var(--color-slate8);
    overflow: scroll;
  }

  table {
    width: 100%;
    border-collapse: collapse;

    /* header row */
    thead tr:first-child {
      border-bottom: 0.09375rem solid var(--color-slate5);

      th {
        text-align: left;
        padding-bottom: 0.375rem;

        /* last column */
        &:last-child {
          min-width: 10rem;
        }
      }
    }

    /* first column */
    tr {
      th:first-child,
      td:first-child {
        min-width: 24rem;
      }
    }

    /* first row of data */
    tbody tr:first-child {
      td {
        padding-top: 0.75rem;
      }
    }

    th,
    td {
      padding: 0.5rem 3rem 0.5rem 1rem;
    }
  }
`

export default function Home() {
  const [addresses, setAddresses] = useState<string[]>([])

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
              options={['Nouns', 'Lil Nouns', 'Gnars', 'Builder']}
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

          {addresses.length > 0 && (
            <ResultsWrapper>
              <span className="result-count">
                {addresses.length} addresses found
              </span>
              <div className="results">
                <table>
                  <thead>
                    <tr>
                      <th>Address</th>
                      <th>ENS Name</th>
                    </tr>
                  </thead>

                  <tbody>
                    {addresses.map((address, i) => (
                      <tr key={address + i}>
                        <td>{address}</td>
                        <td>{<EnsName address={address} />}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ResultsWrapper>
          )}
        </Layout>
      </Container>
    </>
  )
}
