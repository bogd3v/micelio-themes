/** A band of the halftone sun: where it starts, how tall it is and the radius of its dots, in the hero's 600 x 600 box. */
export interface HalftoneBand {
  y: number
  height: number
  dot: number
}

/** Side of the halftone cell of the hero art, in the units of its box. */
export const HALFTONE_CELL = 14

/** The sun of the hero art: its center and radius. */
export const SUN = { cx: 340, cy: 270, r: 200 } as const

/** The bands of the sun, from the lightest tint at the top to the solid ink at the bottom. */
export const SUN_BANDS: readonly HalftoneBand[] = [
  { y: 70, height: 70, dot: 1.8 },
  { y: 140, height: 70, dot: 2.8 },
  { y: 210, height: 70, dot: 3.8 },
  { y: 280, height: 70, dot: 4.9 },
  { y: 350, height: 56, dot: 6 },
  { y: 406, height: 64, dot: 10 },
]

/** The ground lines under the sun: the y and the height of each bar of the key plate. */
export const GROUND: readonly { y: number, height: number }[] = [
  { y: 486, height: 22 },
  { y: 520, height: 14 },
  { y: 546, height: 8 },
  { y: 564, height: 4 },
]

/** Where the registration marks of the hero art sit. */
export const REGISTRATION: readonly { cx: number, cy: number }[] = [
  { cx: 566, cy: 34 },
  { cx: 34, cy: 566 },
]

/** Which plate prints a shape: the category's ink or the key plate, solid or as a halftone tint. */
export type Plate = 'color' | 'color-tone' | 'key' | 'key-tone'

/** A shape of a category illustration, in a 100 x 100 box. */
export interface PrintShape {
  plate: Plate
  d: string
}

/** A circle as a path, so every shape of an illustration is drawn the same way. */
function disc(cx: number, cy: number, r: number): string {
  return `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${r * 2} 0a${r} ${r} 0 1 0 ${-r * 2} 0Z`
}

/** The illustrations of the categories: two plates that overlap. A category takes one by its slug. */
export const PRINTS: readonly (readonly PrintShape[])[] = [
  [
    { plate: 'color-tone', d: disc(42, 42, 32) },
    { plate: 'key', d: 'M48 48H88V88H48Z' },
  ],
  [
    { plate: 'color', d: 'M10 88L50 14L90 88Z' },
    { plate: 'key-tone', d: disc(64, 38, 26) },
  ],
  [
    { plate: 'key-tone', d: 'M22 16H78V52H22Z' },
    { plate: 'color', d: 'M10 86A40 40 0 0 1 90 86H70A20 20 0 0 0 30 86Z' },
  ],
  [
    { plate: 'key', d: disc(38, 60, 26) },
    { plate: 'color', d: disc(62, 40, 26) },
  ],
  [
    { plate: 'color', d: 'M10 30L30 10H44L10 44ZM10 62L62 10H76L10 76ZM22 90L90 22V36L36 90ZM54 90L90 54V68L68 90Z' },
    { plate: 'key', d: disc(50, 50, 20) },
  ],
]

/** A patch of the control strip in the footer: a class of `divider.css` that gives it its ink. */
export const STRIP_PATCHES: readonly string[] = [
  'cartel-strip-key',
  'cartel-strip-first',
  'cartel-strip-second',
  'cartel-strip-tone-3',
  'cartel-strip-tone-2',
  'cartel-strip-tone-1',
]
