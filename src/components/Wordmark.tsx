import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';

interface WordmarkProps {
  title: string;
}

// The pulsing ember dot + title used in every screen's topbar — same mark
// throughout the prototype (.wordmark / .dot), just a different title per
// screen ("Spark" on Feed, "New session" on check-in, etc.).
export function Wordmark({ title }: WordmarkProps) {
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 1300, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 1300, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  const dotOpacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.7, 1] });
  const dotScale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.25] });

  return (
    <View style={styles.wordmark}>
      <Animated.View
        style={[styles.dot, { opacity: dotOpacity, transform: [{ scale: dotScale }] }]}
      />
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wordmark: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: colors.ember,
    shadowColor: colors.ember,
    shadowOpacity: 0.8,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 0 },
  },
  text: {
    fontFamily: fonts.displayExtraBold,
    fontSize: 26,
    color: colors.text,
    letterSpacing: -0.5,
  },
});
