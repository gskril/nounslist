type RowProps = {
  name: string
  options: { label: string; value: string }[]
}

export function Row({ name, options }: RowProps) {
  return (
    <>
      <div className="row">
        <span className="name">{name}:</span>
        <div className="options">
          {options.map((option, i) => (
            <div className="option" key={option.label}>
              <input
                type="checkbox"
                name={name}
                id={option.value}
                value={option.value}
                defaultChecked={i === 0}
              />
              <label htmlFor={option.value}>{option.label}</label>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .row {
          display: flex;
          flex-direction: row;
          align-items: center;
          height: fit-content;
          position: relative;
        }

        .row::after {
          content: '';
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 5rem;
          pointer-events: none;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            var(--color-background) 100%
          );
        }

        .name {
          min-width: 8rem;
          font-weight: 700;
          font-size: 1.125rem;
          color: var(--color-body);
        }

        .options {
          gap: 0.75rem;
          display: flex;
          overflow: scroll;
          padding-right: 2rem;
        }

        .option {
          display: block;
          position: relative;
          min-width: fit-content;
        }

        input {
          visibility: hidden;
          position: absolute;
        }

        label {
          display: block;
          padding: 0.375rem 0.875rem;
          background-color: transparent;
          border: 0.09375rem solid var(--color-border);
          border-radius: 0.625rem;
          color: var(--color-body);
          transition: all 0.15s ease-in-out;
        }

        input + label:hover {
          cursor: pointer;
        }

        input:disabled + label:hover {
          cursor: not-allowed;
        }

        input:checked + label {
          background-color: var(--color-background);
          border-color: var(--color-dark-text);
        }
      `}</style>
    </>
  )
}
