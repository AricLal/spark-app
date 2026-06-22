// Ported 1:1 from the prototype's CSS variables (:root in spark.html).
// "Golden hour haze" palette: warm darks + ember accent.
export const colors = {
  bg: '#15110e',
  surface: '#1f1813',
  surface2: '#2a211a',
  line: '#3a2e24',
  ember: '#ff7a36',
  emberSoft: '#ffb066',
  gold: '#ffcf8a',
  plum: '#b99cc9',
  text: '#f6ede2',
  muted: '#a8978a',
  dim: '#7a6a5d',
} as const;

// Avatar gradient pairs, cycled by index — matches `avaColors` in the prototype.
export const avatarGradients: [string, string][] = [
  ['#ff9a5a', '#e8643c'],
  ['#b99cc9', '#7a5a8a'],
  ['#ffcf8a', '#e8a04c'],
  ['#8ac0a0', '#4a8a6a'],
  ['#f08a8a', '#c05a6a'],
];

export function avatarGradientFor(index: number): [string, string] {
  return avatarGradients[index % avatarGradients.length];
}
