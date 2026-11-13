// Typographic ornaments of one ink: the vignettes of ThemeIllustration and the pieces of ThemeHero.
// Each is drawn on a 100 x 100 box from rules, lozenges and one leaf, as a compositor would set them from a case of flowers

/** One path of an ornament. */
export interface Stroke {
  /** An SVG path. */
  d: string
  /** `fill` paints the shape in the ink; `rule` strokes it as a hairline. */
  kind: 'fill' | 'rule'
}

const lozenge = (x: number, y: number, r: number) => `M${x} ${y - r}L${x + r} ${y}L${x} ${y + r}L${x - r} ${y}Z`

const asterisk = (x: number, y: number, r: number) => [0, 60, 120]
  .map((deg) => {
    const a = (deg * Math.PI) / 180
    const dx = +(Math.sin(a) * r).toFixed(2)
    const dy = +(Math.cos(a) * r).toFixed(2)
    return `M${x - dx} ${y - dy}L${x + dx} ${y + dy}`
  })
  .join('')

const rosette = (x: number, y: number, ring: number, r: number) => Array.from({ length: 8 }, (_, i) => {
  const a = (i * Math.PI) / 4
  return lozenge(+(x + Math.cos(a) * ring).toFixed(2), +(y + Math.sin(a) * ring).toFixed(2), r)
}).join('')

/** The five vignettes, one per category role (category-1 to category-5). */
export const VIGNETTES: readonly (readonly Stroke[])[] = [
  // A compound rule: two hairlines, a lozenge and two points
  [
    { d: 'M6 46H38M6 54H38M62 46H94M62 54H94', kind: 'rule' },
    { d: `${lozenge(50, 50, 14)}${lozenge(4, 50, 3)}${lozenge(96, 50, 3)}`, kind: 'fill' },
  ],
  // An asterism
  [
    { d: `${asterisk(50, 32, 12)}${asterisk(32, 64, 12)}${asterisk(68, 64, 12)}`, kind: 'rule' },
  ],
  // An aldine leaf on its stem
  [
    { d: 'M50 80C30 64 20 47 31 34C39 25 50 30 50 41C50 30 61 25 69 34C80 47 70 64 50 80Z', kind: 'fill' },
    { d: 'M50 41C52 27 61 19 73 17C81 16 85 22 80 26', kind: 'rule' },
  ],
  // A rosette of eight lozenges round a point
  [
    { d: `${rosette(50, 50, 26, 7)}${lozenge(50, 50, 6)}`, kind: 'fill' },
    { d: 'M50 50m-38 0a38 38 0 1 0 76 0a38 38 0 1 0 -76 0', kind: 'rule' },
  ],
  // A cartouche: a double frame with its corners
  [
    { d: 'M12 22H88V78H12ZM18 28H82V72H18Z', kind: 'rule' },
    { d: `M8 18h8v8h-8ZM84 18h8v8h-8ZM8 74h8v8h-8ZM84 74h8v8h-8Z${lozenge(50, 50, 9)}`, kind: 'fill' },
  ],
]

/** A dinkus for a category the theme cannot place: three lozenges in a row. */
export const DINKUS: readonly Stroke[] = [
  { d: `${lozenge(30, 50, 5)}${lozenge(50, 50, 5)}${lozenge(70, 50, 5)}`, kind: 'fill' },
]

/** The vignette for a color role: `var(--category-N)` picks the N-th; anything else (the neutral color) gets the dinkus. */
export function vignetteFor(color: string): readonly Stroke[] {
  const rank = /category-(\d+)/.exec(color)?.[1]
  return rank ? (VIGNETTES[(Number(rank) - 1) % VIGNETTES.length] ?? DINKUS) : DINKUS
}

/** The rosette, the centre of ThemeHero. */
export const ROSETTE: readonly Stroke[] = VIGNETTES[3]!
