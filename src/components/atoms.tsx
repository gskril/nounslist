import styled from 'styled-components'

import { mq } from '@/styles/breakpoints'

export const Container = styled.div`
  width: 100%;
  max-width: 56rem;
  margin: 0 auto;
  padding-left: 1rem;
  padding-right: 1rem;

  @media ${mq.sm.min} {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`

export const Heading = styled.h1`
  font-size: 2rem;
  font-weight: 800;

  @media ${mq.xs.min} {
    font-size: 3rem;
  }

  @media ${mq.md.min} {
    font-size: 4rem;
  }
`

export const Button = styled.button`
  display: block;
  width: fit-content;
  padding: 0.625rem 1.5rem;
  background: var(--color-dark-text);
  border: none;
  color: var(--color-background);
  border-radius: 0.625rem;
  transition: all 0.1s ease-in-out;

  &:hover {
    cursor: pointer;
    transform: translateY(-1px);
    opacity: 0.8;
  }
`
