import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SceneArt } from '../SceneArt';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/typography';
import type { MapSession } from '../../data/mapData';

interface MapSheetProps {
  session: MapSession | null;
  visible: boolean;
  onClose: () => void;
  onViewSession: () => void;
}

interface Chip {
  text: string;
  strain?: boolean;
}

const SHEET_HIDDEN_Y = 280;

// Matches .sheet/.sheet-card/.sheet-act — unlike the full session overlay,
// this one animates both opening AND closing (the prototype's .sheet has a
// CSS transition on transform, not a one-shot keyframe), so it's driven by
// the `visible` prop both ways rather than only on mount.
export function MapSheet({ session, visible, onClose, onViewSession }: MapSheetProps) {
  const translateY = useRef(new Animated.Value(SHEET_HIDDEN_Y)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: visible ? 0 : SHEET_HIDDEN_Y,
      duration: 320,
      easing: Easing.bezier(0.2, 0.8, 0.2, 1),
      useNativeDriver: true,
    }).start();
  }, [visible, translateY]);

  if (!session) return null;

  const chips: Chip[] = [];
  if (session.strain) chips.push({ text: `🌿 ${session.strain}`, strain: true });
  if (session.mood) chips.push({ text: session.mood });
  if (session.count > 1) chips.push({ text: `+${session.count - 1} more nearby` });

  return (
    <Animated.View style={[styles.sheet, { transform: [{ translateY }] }]}>
      <View style={styles.grab} />
      <View style={styles.card}>
        <View style={styles.thumb}>
          <SceneArt scene={session.scene} gradientId="map-sheet" />
        </View>
        <View style={styles.info}>
          <View style={styles.userRow}>
            <Text style={styles.userName}>{session.user}</Text>
            {session.friend && (
              <View style={styles.friendBadge}>
                <Text style={styles.friendBadgeText}>friend</Text>
              </View>
            )}
          </View>
          <Text style={styles.loc}>📍 Around {session.area} · just now</Text>
          <View style={styles.chipsRow}>
            {chips.length > 0 ? (
              chips.map((c) => (
                <View key={c.text} style={[styles.chip, c.strain && styles.chipStrain]}>
                  <Text style={[styles.chipText, c.strain && styles.chipStrainText]}>
                    {c.text}
                  </Text>
                </View>
              ))
            ) : (
              <View style={styles.chip}>
                <Text style={styles.chipText}>just the moment</Text>
              </View>
            )}
          </View>
        </View>
      </View>

      <View style={styles.actions}>
        <Pressable onPress={onClose} style={styles.actionBtn}>
          <Text style={styles.actionText}>Close</Text>
        </Pressable>
        <Pressable onPress={onViewSession} style={styles.actionPrimaryWrap}>
          <LinearGradient
            colors={[colors.ember, colors.emberSoft]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.actionPrimaryGradient}
          >
            <Text style={styles.actionPrimaryText}>View session</Text>
          </LinearGradient>
        </Pressable>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.line,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 26,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -16 },
    shadowOpacity: 0.6,
    shadowRadius: 30,
    elevation: 12,
  },
  grab: {
    width: 38,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.line,
    alignSelf: 'center',
    marginTop: 2,
    marginBottom: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
  },
  thumb: {
    width: 74,
    height: 90,
    borderRadius: 14,
    overflow: 'hidden',
  },
  info: {
    flex: 1,
    minWidth: 0,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  userName: {
    fontSize: 15,
    fontFamily: fonts.bodyBold,
    color: colors.text,
  },
  friendBadge: {
    backgroundColor: 'rgba(185,156,201,0.16)',
    paddingVertical: 2,
    paddingHorizontal: 7,
    borderRadius: 999,
  },
  friendBadgeText: {
    fontSize: 10,
    fontFamily: fonts.bodyBold,
    color: colors.plum,
  },
  loc: {
    fontSize: 12,
    color: colors.muted,
    fontFamily: fonts.bodyRegular,
    marginTop: 2,
    marginBottom: 9,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  chip: {
    paddingVertical: 4,
    paddingHorizontal: 9,
    borderRadius: 999,
    backgroundColor: colors.surface2,
    borderWidth: 1,
    borderColor: colors.line,
  },
  chipText: {
    fontSize: 11,
    fontFamily: fonts.bodySemiBold,
    color: colors.muted,
  },
  chipStrain: {
    backgroundColor: 'rgba(255,122,54,0.16)',
    borderColor: 'rgba(255,176,102,0.35)',
  },
  chipStrainText: {
    color: colors.gold,
  },
  actions: {
    flexDirection: 'row',
    gap: 9,
    marginTop: 14,
  },
  actionBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 11,
    borderRadius: 13,
    backgroundColor: colors.surface2,
    borderWidth: 1,
    borderColor: colors.line,
  },
  actionText: {
    fontSize: 13,
    fontFamily: fonts.bodyBold,
    color: colors.text,
  },
  actionPrimaryWrap: {
    flex: 1,
    borderRadius: 13,
    overflow: 'hidden',
  },
  actionPrimaryGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 11,
  },
  actionPrimaryText: {
    fontSize: 13,
    fontFamily: fonts.bodyBold,
    color: '#1a0f08',
  },
});
