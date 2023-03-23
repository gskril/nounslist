type RowProps = {
  name: string
  options: string[]
}

export function Row({ name, options }: RowProps) {
  return (
    <>
      <div className="row">
        <span className="name">{name}:</span>
        <div className="options">
          {options.map((option, i) => (
            <div className="option" key={option}>
              <input
                type="checkbox"
                name={option}
                id={option}
                value={option}
                defaultChecked={i === 0}
              />
              <label htmlFor={option}>{option}</label>
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
            var(--color-slate1) 100%
          );
        }

        .name {
          min-width: 8rem;
          font-weight: 700;
          font-size: 1.125rem;
          color: var(--color-slate12);
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
          border: 0.09375rem solid var(--color-slate8);
          border-radius: 0.625rem;
          color: var(--color-slate12);
        }

        input:checked + label {
          background-color: var(--color-slate5);
        }
      `}</style>
    </>
  )
}
