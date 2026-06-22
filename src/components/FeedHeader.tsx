import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';

// Matches .topbar / .wordmark / .iconbtn.addfr in the prototype: the
// "Spark" wordmark with a pulsing ember dot, and the add-friends icon
// button with its unread-request badge.
export function FeedHeader({ requestCount = 2 }: { requestCount?: number }) {
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
    <View style={styles.topbar}>
      <View style={styles.wordmark}>
        <Animated.View
          style={[
            styles.dot,
            { opacity: dotOpacity, transform: [{ scale: dotScale }] },
          ]}
        />
        <Text style={styles.wordmarkText}>Spark</Text>
      </View>

      <View>
        <View style={styles.iconBtn}>
          <Feather name="users" size={18} color={colors.muted} />
        </View>
        {requestCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{requestCount}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 6,
    paddingBottom: 14,
  },
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
  wordmarkText: {
    fontFamily: fonts.displayExtraBold,
    fontSize: 26,
    color: colors.text,
    letterSpacing: -0.5,
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    minWidth: 17,
    height: 17,
    paddingHorizontal: 4,
    borderRadius: 9,
    backgroundColor: colors.ember,
    borderWidth: 2,
    borderColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 10,
    fontFamily: fonts.bodyBold,
    color: '#1a0f08',
  },
});
