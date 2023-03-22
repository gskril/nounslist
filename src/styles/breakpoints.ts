const breakpoints = {
  xs: 360,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
}

export const mq = {
  xs: {
    min: `screen and (min-width: ${breakpoints.xs}px)`,
    max: `screen and (max-width: ${breakpoints.xs - 1}px)`,
  },
  sm: {
    min: `screen and (min-width: ${breakpoints.sm}px)`,
    max: `screen and (max-width: ${breakpoints.sm - 1}px)`,
  },
  md: {
    min: `screen and (min-width: ${breakpoints.md}px)`,
    max: `screen and (max-width: ${breakpoints.md - 1}px)`,
  },
  lg: {
    min: `screen and (min-width: ${breakpoints.lg}px)`,
    max: `screen and (max-width: ${breakpoints.lg - 1}px)`,
  },
  xl: {
    min: `screen and (min-width: ${breakpoints.xl}px)`,
    max: `screen and (max-width: ${breakpoints.xl - 1}px)`,
  },
}

/* Usage in styled-components:
@media ${mq.sm.min} {
  ...
}
*/
