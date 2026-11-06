/** A node of the network: center and radius, in the mark's 320 x 320 box. */
export interface NetworkNode {
  cx: number
  cy: number
  r: number
}

/** The origin node of the Micelio mark. */
export const NETWORK_ORIGIN: NetworkNode = { cx: 49.54, cy: 164.43, r: 33.47 }

/** The seven threads of the Micelio mark. */
export const NETWORK_THREADS: readonly string[] = [
  'M49.54 164.43C72.89 143.05 91.08 128.42 98.33 119.17',
  'M98.33 119.17C114.81 79.79 89.61 86.28 122.88 42.49',
  'M98.33 119.17C107.84 107.03 156.57 109.71 176.97 96.55C197.37 83.38 199.21 56.85 270.9 62.45',
  'M270.9 62.45C200.84 115.1 265.77 137.38 182.3 180.64',
  'M49.54 164.43C147.13 157.78 95.56 190.37 182.3 180.64',
  'M49.54 164.43C140.04 211.97 51.16 223.92 134.77 278.32',
  'M134.77 278.32C203.84 267.31 180.77 195.47 280.55 224.84',
]

/** The five nodes of the Micelio mark. */
export const NETWORK_NODES: readonly NetworkNode[] = [
  { cx: 122.88, cy: 42.49, r: 23.52 },
  { cx: 270.9, cy: 62.45, r: 23.45 },
  { cx: 182.3, cy: 180.64, r: 23.45 },
  { cx: 280.55, cy: 224.84, r: 23.39 },
  { cx: 134.77, cy: 278.32, r: 23.46 },
]

/** Finer threads the hero art grows from the mark's nodes. */
export const NETWORK_FINE_THREADS: readonly string[] = [
  'M270.9 62.45C300 40 320 52 350 30',
  'M270.9 62.45C310 70 330 100 372 110',
  'M372 110C390 125 398 145 405 162',
  'M280.55 224.84C320 215 345 200 380 192',
  'M280.55 224.84C310 250 330 285 362 290',
  'M362 290C378 302 390 318 402 330',
  'M134.77 278.32C165 300 180 330 215 336',
  'M134.77 278.32C110 290 95 315 70 322',
  'M122.88 42.49C145 30 165 20 192 10',
  'M182.3 180.64C225 175 262 168 300 150',
]

/** The small nodes at the ends of the fine threads. */
export const NETWORK_FINE_NODES: readonly NetworkNode[] = [
  { cx: 350, cy: 30, r: 7 },
  { cx: 372, cy: 110, r: 9 },
  { cx: 405, cy: 162, r: 5 },
  { cx: 380, cy: 192, r: 6 },
  { cx: 362, cy: 290, r: 10 },
  { cx: 402, cy: 330, r: 5 },
  { cx: 215, cy: 336, r: 8 },
  { cx: 70, cy: 322, r: 6 },
  { cx: 192, cy: 10, r: 5 },
  { cx: 300, cy: 150, r: 6 },
]

/** Radii of the rings drawn around the origin in the hero art. */
export const NETWORK_RINGS: readonly number[] = [58, 88, 124]

/** A small colony of the category illustration, in a 100 x 100 box. */
export interface Colony {
  origin: NetworkNode
  threads: string
  nodes: readonly NetworkNode[]
}

/** The colonies a category can take; a slug picks one by its characters. */
export const COLONIES: readonly Colony[] = [
  {
    origin: { cx: 20, cy: 60, r: 12 },
    threads: 'M20 60Q40 30 62 34M20 60Q46 62 70 74M62 34Q78 30 84 16',
    nodes: [{ cx: 62, cy: 34, r: 9 }, { cx: 70, cy: 74, r: 7 }, { cx: 84, cy: 16, r: 5 }],
  },
  {
    origin: { cx: 20, cy: 30, r: 12 },
    threads: 'M20 30Q44 34 50 56M50 56Q70 52 82 36M50 56Q54 76 76 84',
    nodes: [{ cx: 50, cy: 56, r: 9 }, { cx: 82, cy: 36, r: 6 }, { cx: 76, cy: 84, r: 7 }],
  },
  {
    origin: { cx: 18, cy: 76, r: 12 },
    threads: 'M18 76Q30 44 54 46M54 46Q60 24 80 22M54 46Q72 56 84 70',
    nodes: [{ cx: 54, cy: 46, r: 9 }, { cx: 80, cy: 22, r: 6 }, { cx: 84, cy: 70, r: 6 }],
  },
]
