import React from 'react';
import Svg, { Defs, G, Line, Path, RadialGradient, Rect, Stop } from 'react-native-svg';
import { StyleSheet } from 'react-native';

// A direct port of the inline <svg class="map-svg"> in spark.html — the
// stylized base map (gradient, two park blobs, a river, a few roads) that
// sits behind the pins. Same viewBox and paths as the prototype.
export function MapBackground() {
  return (
    <Svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      style={StyleSheet.absoluteFillObject}
    >
      <Defs>
        <RadialGradient id="mg" cx="50%" cy="40%" r="75%">
          <Stop offset="0" stopColor="#241a14" />
          <Stop offset="1" stopColor="#120d0a" />
        </RadialGradient>
      </Defs>
      <Rect width={100} height={100} fill="url(#mg)" />

      {/* park blobs */}
      <Path d="M6 12 Q22 6 30 18 Q34 30 18 32 Q4 30 6 12Z" fill="#1c2417" opacity={0.7} />
      <Path d="M70 64 Q88 60 90 76 Q88 90 74 88 Q62 82 70 64Z" fill="#1c2417" opacity={0.7} />

      {/* river */}
      <Path
        d="M-2 70 Q30 60 48 74 Q66 88 102 78"
        stroke="#1d2a38"
        strokeWidth={6}
        fill="none"
        opacity={0.6}
      />

      {/* roads */}
      <G stroke="#2e251d" strokeWidth={0.8} opacity={0.8}>
        <Line x1={0} y1={40} x2={100} y2={46} />
        <Line x1={0} y1={62} x2={100} y2={58} />
        <Line x1={34} y1={0} x2={40} y2={100} />
        <Line x1={66} y1={0} x2={62} y2={100} />
        <Line x1={0} y1={22} x2={100} y2={20} />
      </G>
    </Svg>
  );
}
