import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SceneArt } from '../SceneArt';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/typography';
import type { SceneType } from '../../data/feedData';

interface CaptureBoxProps {
  scene: SceneType | null;
  onCapture: () => void;
  onRetake: () => void;
}

// Matches .capture / .capture.shot / .capture .retake. There's no real
// camera here, same as the prototype — tapping the box "takes a shot" by
// randomly picking one of the scene illustrations. Tapping the box again
// after a shot re-randomizes it; the explicit Retake pill clears back to
// the empty placeholder. Two independent Pressables reproduce that without
// needing DOM-style event propagation tricks.
export function CaptureBox({ scene, onCapture, onRetake }: CaptureBoxProps) {
  return (
    <Pressable onPress={onCapture} style={styles.box}>
      {scene ? (
        <>
          <SceneArt scene={scene} gradientId="checkin-capture" />
          <Pressable onPress={onRetake} style={styles.retake}>
            <Text style={styles.retakeText}>Retake</Text>
          </Pressable>
        </>
      ) : (
        <View style={styles.placeholder}>
          <View style={styles.lens}>
            <Text style={styles.lensIcon}>⛰</Text>
          </View>
          <Text style={styles.placeholderText}>Tap to add photo</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  box: {
    aspectRatio: 4 / 5,
    borderRadius: 24,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.line,
    backgroundColor: colors.surface,
    overflow: 'hidden',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    alignItems: 'center',
    gap: 10,
  },
  lens: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: colors.surface2,
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lensIcon: {
    fontSize: 26,
  },
  placeholderText: {
    color: colors.dim,
    fontFamily: fonts.bodyRegular,
    fontSize: 14,
  },
  retake: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(20,14,10,0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
  },
  retakeText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: fonts.bodySemiBold,
  },
});
