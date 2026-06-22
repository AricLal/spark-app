import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Defs, RadialGradient, Stop } from 'react-native-svg';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/typography';

interface PostedOverlayProps {
  visible: boolean;
}

// Matches .posted/.ember-burst — the "Session sparked" confirmation that
// pops in after posting, before the screen resets and returns to the feed.
export function PostedOverlay({ visible }: PostedOverlayProps) {
  const scale = useRef(new Animated.Value(0.2)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      scale.setValue(0.2);
      opacity.setValue(0);
      Animated.parallel([
        Animated.spring(scale, { toValue: 1, useNativeDriver: true, friction: 5 }),
        Animated.timing(opacity, { toValue: 1, duration: 250, useNativeDriver: true }),
      ]).start();
    }
  }, [visible, scale, opacity]);

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <Animated.View style={[styles.burst, { transform: [{ scale }], opacity }]}>
        <Svg
          width={90}
          height={90}
          viewBox="0 0 90 90"
          style={StyleSheet.absoluteFillObject}
        >
          <Defs>
            <RadialGradient id="burst" cx="50%" cy="50%" r="50%">
              <Stop offset="0" stopColor={colors.ember} stopOpacity={1} />
              <Stop offset="0.7" stopColor={colors.ember} stopOpacity={0} />
            </RadialGradient>
          </Defs>
          <Circle cx={45} cy={45} r={45} fill="url(#burst)" />
        </Svg>
        <Text style={styles.burstIcon}>✦</Text>
      </Animated.View>
      <Text style={styles.title}>Session sparked</Text>
      <Text style={styles.subtitle}>
        Your crew just got the notification. It's live on the feed.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(13,10,8,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
    paddingHorizontal: 40,
  },
  burst: {
    width: 90,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  burstIcon: {
    fontSize: 46,
    color: colors.text,
  },
  title: {
    fontFamily: fonts.displayBold,
    fontSize: 22,
    color: colors.text,
  },
  subtitle: {
    fontFamily: fonts.bodyRegular,
    fontSize: 14,
    color: colors.muted,
    textAlign: 'center',
    maxWidth: 230,
  },
});
