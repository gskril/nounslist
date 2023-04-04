import Head from 'next/head'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import styled from 'styled-components'

import { Loader } from '@/components/Loader'
import { Noggles } from '@/components/Noggles'
import { PoweredBy } from '@/components/PoweredBy'
import { Row } from '@/components/Row'
import { Button, Container, Heading } from '@/components/atoms'
import { handleSubmit } from '@/handler'
import { useEnsNames } from '@/hooks/useEnsNames'
import { mq } from '@/styles/breakpoints'

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding-top: 4rem;
  padding-bottom: 4rem;
`

const Header = styled.div`
  display: grid;
  gap: 2rem;
  flex-direction: column;

  @media ${mq.sm.min} {
    grid-template-columns: 1fr 2.25fr;
    flex-direction: row;
  }

  .left {
    --offset: 1.75rem;

    gap: 0.25rem;
    display: flex;
    flex-direction: column;
    line-height: 0.8;
    width: 10rem;

    @media ${mq.sm.min} {
      --offset: 2.125rem;

      width: 13rem;
    }

    @media ${mq.lg.min} {
      transform: translateX(calc(-1 * var(--offset)));
    }

    span {
      font-size: 5rem;
      color: var(--color-primary);
      font-family: var(--font-heading);
      transform: translateX(var(--offset));

      @media ${mq.sm.min} {
        font-size: 6.375rem;
      }
    }
  }

  .right {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    @media ${mq.sm.min} {
      gap: 1.25rem;
    }
  }
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
    padding: 0.5rem 1rem;
    max-height: 25rem;
    position: relative;
    border-radius: 0.625rem;
    background-color: var(--color-base);
    border: 0.09375rem solid var(--color-border);
    overflow: scroll;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    color: var(--color-dark-text);

    /* header row */
    thead tr:first-child {
      border-bottom: 0.09375rem solid var(--color-accent);

      th {
        text-align: left;
        padding-bottom: 0.375rem;

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

        @media ${mq.sm.min} {
          min-width: 32rem;
        }
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
      padding: 0.5rem 3rem 0.5rem 0.75rem;
    }

    td {
      font-weight: 400;

      &[data-ens='false'] {
        opacity: 0.6;
        color: var(--color-light-text);
      }
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
        <title>Nouns List</title>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta
          name="description"
          content="Create allowlists from the Nouns ecosystem"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:image" content="https://nounslist.com/sharing.jpg" />
        <meta property="og:title" content="Nouns List" />
        <meta
          property="og:description"
          content="Create allowlists from the Nouns ecosystem"
        />
      </Head>

      <Container as="main">
        <Layout>
          <Header>
            <div className="left">
              <Noggles />
              <span>LIST</span>
            </div>
            <div className="right">
              <Heading>Create allowlists from the Nouns ecosystem</Heading>
              <PoweredBy />
            </div>
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
                  console.error(err)
                  setIsLoading(false)
                  return 'Error fetching data'
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
                        <td
                          data-ens={ensNames[i]?.includes('...') ? false : true}
                        >
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
