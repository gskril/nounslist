import Link from 'next/link'
import { useState } from 'react'

export function PoweredBy() {
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
        .hover-target {
          font-weight: bold;
        }

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
          width: 13rem;
          border-radius: 0.25rem;
          color: var(--color-background);
          background-color: var(--color-primary);
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
