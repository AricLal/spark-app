import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';

interface PhotoBadgesProps {
  strain: string | null;
  mood: string | null;
  rating: number;
}

// Matches .scene-tag/.chip/.stars — the strain/mood chip row and the star
// badge that float over a session photo. Used by both FeedCard and
// SessionDetailScreen so the look stays identical in both places. Must be
// placed inside a `position: relative` (or absolute-filled) container the
// size of the photo.
export function PhotoBadges({ strain, mood, rating }: PhotoBadgesProps) {
  const hasTags = strain || mood;

  return (
    <>
      {hasTags && (
        <View style={styles.sceneTag}>
          {strain && (
            <View style={[styles.chip, styles.chipStrain]}>
              <Text style={styles.chipStrainText}>🌿 {strain}</Text>
            </View>
          )}
          {mood && (
            <BlurView intensity={30} tint="dark" style={styles.chip}>
              <Text style={styles.chipText}>{mood}</Text>
            </BlurView>
          )}
        </View>
      )}

      {rating > 0 && (
        <BlurView intensity={30} tint="dark" style={styles.stars}>
          <Text style={styles.starsText}>
            {'★'.repeat(rating)}
            <Text style={styles.starsDim}>{'★'.repeat(5 - rating)}</Text>
          </Text>
        </BlurView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  sceneTag: {
    position: 'absolute',
    left: 12,
    bottom: 12,
    flexDirection: 'row',
    gap: 7,
    flexWrap: 'wrap',
    maxWidth: '85%',
  },
  chip: {
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    paddingVertical: 6,
    paddingHorizontal: 11,
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chipText: {
    color: colors.text,
    fontSize: 12,
    fontFamily: fonts.bodySemiBold,
  },
  chipStrain: {
    backgroundColor: 'rgba(255,122,54,0.22)',
    borderColor: 'rgba(255,176,102,0.4)',
  },
  chipStrainText: {
    color: colors.gold,
    fontSize: 12,
    fontFamily: fonts.bodySemiBold,
  },
  stars: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
  },
  starsText: {
    fontSize: 12,
    fontFamily: fonts.bodyBold,
    color: colors.gold,
  },
  starsDim: {
    color: colors.dim,
  },
});
