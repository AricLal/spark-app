import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import type { LayoutChangeEvent } from 'react-native';
import { SceneArt } from '../SceneArt';
import type { SceneType } from '../../data/feedData';

interface ProfileGridProps {
  scenes: SceneType[];
}

const COLUMNS = 3;
const GAP = 5;

// Matches .grid/.gcell — a 3-column grid of square photo cells. Measures
// its own width on layout to compute an exact cell size (accounting for
// the gaps) rather than approximating with percentages, so the cells are
// true squares (aspect-ratio: 1 in the prototype) on any screen width.
export function ProfileGrid({ scenes }: ProfileGridProps) {
  const [width, setWidth] = useState(0);

  const handleLayout = (e: LayoutChangeEvent) => {
    setWidth(e.nativeEvent.layout.width);
  };

  const cellSize = width > 0 ? (width - GAP * (COLUMNS - 1)) / COLUMNS : 0;

  return (
    <View style={styles.grid} onLayout={handleLayout}>
      {scenes.map((scene, i) => (
        <View
          key={i}
          style={[styles.cell, { width: cellSize, height: cellSize }]}
        >
          {cellSize > 0 && <SceneArt scene={scene} gradientId={`profile-grid-${i}`} />}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GAP,
    paddingHorizontal: 14,
    paddingTop: 6,
    paddingBottom: 20,
  },
  cell: {
    borderRadius: 12,
    overflow: 'hidden',
  },
});
