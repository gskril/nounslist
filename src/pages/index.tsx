import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import styled from 'styled-components'

import { Loader } from '@/components/Loader'
import { Row } from '@/components/Row'
import { Button, Container, Heading } from '@/components/atoms'
import { handleSubmit } from '@/handler'
import { useEnsNames } from '@/hooks/useEnsNames'

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
  gap: 0.75rem;
`

const ResultsWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .result-count {
    position: absolute;
    top: -1.625rem;
    right: 1rem;
  }

  .results {
    width: 100%;
    padding: 1rem;
    max-height: 25rem;
    position: relative;
    border-radius: 0.625rem;
    background-color: var(--color-background);
    border: 0.09375rem solid var(--color-border);
    overflow: scroll;
  }

  table {
    width: 100%;
    border-collapse: collapse;

    /* header row */
    thead tr:first-child {
      border-bottom: 0.09375rem solid var(--color-accent);

      th {
        text-align: left;
        padding-bottom: 0.375rem;
        color: var(--color-dark-text);

        /* last column */
        &:last-child {
          width: 100%;
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
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [addresses, setAddresses] = useState<string[]>([])
  const { names: ensNames, isLoading: ensNamesLoading } = useEnsNames(addresses)

  return (
    <>
      <Head>
        <title>Nouns Drop</title>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <meta
          name="description"
          content="Create allowlists from the Nouns ecosystem"
        />

        <meta property="og:image" content="" />
        <meta property="og:title" content="Nouns Drop" />
        <meta
          property="og:description"
          content="Create allowlists from the Nouns ecosystem"
        />
      </Head>

      <Container as="main">
        <Layout>
          <Header>
            <Heading>Create allowlists from the Nouns ecosystem</Heading>
            <PoweredBy />
          </Header>

          <Form
            onSubmit={async (e) => {
              setIsLoading(true)
              const res = handleSubmit(e, setAddresses)

              toast.promise(res, {
                loading: 'Loading...',
                success: () => {
                  setIsLoading(false)
                  return 'Success!'
                },
                error: (err) => {
                  setIsLoading(false)
                  return `${err.toString().replace('Error: ', '')}`
                },
              })
            }}
          >
            <Row
              name="DAOs"
              options={[
                {
                  label: 'Nouns',
                  value: '0x9c8ff314c9bc7f6e59a9d9225fb22946427edc03',
                },
                {
                  label: 'Lil Nouns',
                  value: '0x4b10701bfd7bfedc47d50562b76b436fbb5bdb3b',
                },
                {
                  label: 'Gnars',
                  value: '0x558BFFF0D583416f7C4e380625c7865821b8E95C',
                },
                {
                  label: 'Builder',
                  value: '0xdf9b7d26c8fc806b1ae6273684556761ff02d422',
                },
                {
                  label: 'Purple',
                  value: '0xa45662638e9f3bbb7a6fecb4b17853b7ba0f3a60',
                },
              ]}
            />

            <Row
              name="Attributes"
              options={[
                { label: 'Owner', value: 'token-owner' },
                { label: 'Won an auction', value: 'auction-winner' },
                { label: 'Created a proposal', value: 'proposal-creator' },
                { label: 'Voted onchain', value: 'voter' },
              ]}
            />

            <Button type="submit" style={{ marginTop: '0.5rem' }}>
              Generate allowlist
            </Button>
          </Form>

          {isLoading && (
            <div style={{ width: '4rem', opacity: 0.8 }}>
              <Loader />
            </div>
          )}

          {addresses.length > 0 && (
            <ResultsWrapper>
              <span className="result-count">
                {new Intl.NumberFormat().format(addresses.length)} addresses
                found
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
                      <tr key={address}>
                        <td>{address}</td>
                        <td>
                          {ensNamesLoading
                            ? i === 0
                              ? 'loading...'
                              : ''
                            : ensNames[i]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Button
                onClick={async () => {
                  await navigator.clipboard
                    .writeText(addresses.join('\n'))
                    .then(() => toast.success('Copied to clipboard!'))
                    .catch(() => toast.error('Failed to copy to clipboard!'))
                }}
              >
                Copy to clipboard
              </Button>
            </ResultsWrapper>
          )}
        </Layout>
      </Container>

      <Toaster position="bottom-center" />
    </>
  )
}

function PoweredBy() {
  const [hovered, setHovered] = useState(false)

  return (
    <>
      <div
        style={{
          position: 'relative',
          width: 'fit-content',
          paddingBottom: hovered ? '2rem' : '0',
          transition: 'all 0.2s ease-in-out',
        }}
        onMouseLeave={() => setHovered(false)}
      >
        <span>
          Powered by{' '}
          <Link
            href="https://nounish-api-web.vercel.app/"
            target="_blank"
            rel="noopener"
            onFocus={() => setHovered(true)}
            onBlur={() => setHovered(false)}
          >
            <span className="hover-target" onMouseOver={() => setHovered(true)}>
              Nounish API
            </span>
          </Link>
          {hovered && (
            <span className="tooltip">
              Free, open-source data for nounish builders ⌐◨-◨
            </span>
          )}
        </span>
      </div>

      <style jsx>{`
        .hover-target:hover,
        .hover-target:focus-visible {
          opacity: 0.8;
        }

        .tooltip {
          position: absolute;
          top: 1.75rem;
          left: 0;
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
          font-weight: 400;
          width: 13rem;
          border-radius: 0.25rem;
          color: var(--color-background);
          background-color: var(--color-body);
          opacity: 0;
          animation: fadeIn 0.15s ease-out forwards;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </>
  )
}
