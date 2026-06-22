import React from 'react';
import Svg, {
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  Rect,
  Circle,
  Ellipse,
  Path,
  G,
} from 'react-native-svg';
import type { SceneType } from '../data/feedData';

interface SceneArtProps {
  scene: SceneType;
  /** Unique id so multiple instances on screen don't clash gradient defs. */
  gradientId: string;
}

// Faithful port of the `scene()` SVG generator in spark.html — same paths,
// same viewBox (0 0 100 125, matching the 4:5 photo aspect ratio), same
// gradients. These stand in for real photos so nothing needs to load
// externally, exactly like the prototype.
export function SceneArt({ scene, gradientId }: SceneArtProps) {
  const id = (suffix: string) => `${gradientId}-${suffix}`;

  switch (scene) {
    case 'mountain':
      return (
        <Svg viewBox="0 0 100 125" width="100%" height="100%">
          <Defs>
            <LinearGradient id={id('m')} x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor="#ff9a5a" />
              <Stop offset="0.4" stopColor="#e8643c" />
              <Stop offset="1" stopColor="#3a2440" />
            </LinearGradient>
          </Defs>
          <Rect width="100" height="125" fill={`url(#${id('m')})`} />
          <Circle cx="68" cy="34" r="13" fill="#ffe6b0" opacity={0.9} />
          <Path d="M0 95 L24 55 L42 82 L60 48 L82 88 L100 66 L100 125 L0 125Z" fill="#241828" />
          <Path
            d="M0 110 L30 80 L52 100 L74 74 L100 102 L100 125 L0 125Z"
            fill="#160e1a"
            opacity={0.9}
          />
        </Svg>
      );

    case 'campfire':
      return (
        <Svg viewBox="0 0 100 125" width="100%" height="100%">
          <Defs>
            <RadialGradient id={id('f')} cx="50%" cy="78%" r="60%">
              <Stop offset="0" stopColor="#ffb347" />
              <Stop offset="0.35" stopColor="#e8643c" />
              <Stop offset="1" stopColor="#15100c" />
            </RadialGradient>
          </Defs>
          <Rect width="100" height="125" fill={`url(#${id('f')})`} />
          <Circle cx="20" cy="20" r="1" fill="#ffd98a" />
          <Circle cx="78" cy="30" r="1.2" fill="#ffd98a" />
          <Circle cx="60" cy="14" r="1" fill="#ffd98a" />
          <Path d="M50 118 C40 104 56 100 48 86 C62 96 60 110 50 118Z" fill="#ffe08a" />
          <Path d="M50 118 C44 108 54 104 50 92 C58 102 56 112 50 118Z" fill="#ff7a36" />
        </Svg>
      );

    case 'beach':
      return (
        <Svg viewBox="0 0 100 125" width="100%" height="100%">
          <Defs>
            <LinearGradient id={id('b')} x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor="#ffc06a" />
              <Stop offset="0.45" stopColor="#ef7e5a" />
              <Stop offset="0.55" stopColor="#9c5a7a" />
              <Stop offset="1" stopColor="#2c2447" />
            </LinearGradient>
          </Defs>
          <Rect width="100" height="125" fill={`url(#${id('b')})`} />
          <Circle cx="50" cy="48" r="14" fill="#ffe9bd" />
          <Rect y="56" width="100" height="69" fill="#6b4a72" opacity={0.5} />
          <Path d="M0 70 q50 6 100 0 v55 H0Z" fill="#33274d" />
        </Svg>
      );

    case 'rooftop':
      return (
        <Svg viewBox="0 0 100 125" width="100%" height="100%">
          <Defs>
            <LinearGradient id={id('r')} x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor="#3a2c5a" />
              <Stop offset="0.5" stopColor="#a85a55" />
              <Stop offset="1" stopColor="#ffb060" />
            </LinearGradient>
          </Defs>
          <Rect width="100" height="125" fill={`url(#${id('r')})`} />
          <G fill="#1c1426">
            <Rect x="6" y="70" width="14" height="55" />
            <Rect x="24" y="55" width="12" height="70" />
            <Rect x="40" y="78" width="16" height="47" />
            <Rect x="60" y="48" width="13" height="77" />
            <Rect x="77" y="66" width="16" height="59" />
          </G>
          <G fill="#ffcf8a" opacity={0.8}>
            <Rect x="9" y="76" width="3" height="3" />
            <Rect x="27" y="62" width="3" height="3" />
            <Rect x="64" y="56" width="3" height="3" />
            <Rect x="80" y="72" width="3" height="3" />
          </G>
        </Svg>
      );

    case 'forest':
      return (
        <Svg viewBox="0 0 100 125" width="100%" height="100%">
          <Defs>
            <LinearGradient id={id('g')} x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor="#d9a05a" />
              <Stop offset="0.5" stopColor="#7a6a3a" />
              <Stop offset="1" stopColor="#1c2418" />
            </LinearGradient>
          </Defs>
          <Rect width="100" height="125" fill={`url(#${id('g')})`} />
          <G fill="#16200f" opacity={0.88}>
            <Path d="M18 125 L18 60 L10 60 L20 40 L12 40 L22 22 L32 40 L24 40 L34 60 L26 60 L26 125Z" />
            <Path d="M70 125 L70 66 L62 66 L72 48 L64 48 L74 30 L84 48 L76 48 L86 66 L78 66 L78 125Z" />
          </G>
          <Path d="M0 118 q50 -8 100 0 v7 H0Z" fill="#0f1409" />
        </Svg>
      );

    case 'lake':
      return (
        <Svg viewBox="0 0 100 125" width="100%" height="100%">
          <Defs>
            <LinearGradient id={id('l')} x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor="#ffd27a" />
              <Stop offset="0.4" stopColor="#e98a5c" />
              <Stop offset="0.52" stopColor="#7a5a8a" />
              <Stop offset="1" stopColor="#2a2c4a" />
            </LinearGradient>
          </Defs>
          <Rect width="100" height="125" fill={`url(#${id('l')})`} />
          <Circle cx="38" cy="40" r="11" fill="#fff0cc" />
          <Path d="M0 60 L26 40 L44 56 L66 36 L100 62 L100 64 L0 64Z" fill="#2e2440" opacity={0.85} />
          <Rect y="64" width="100" height="61" fill="#5a4a72" opacity={0.45} />
          <Ellipse cx="38" cy="80" rx="9" ry="20" fill="#fff0cc" opacity={0.25} />
        </Svg>
      );

    default:
      return null;
  }
}
