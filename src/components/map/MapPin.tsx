import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/typography';

interface MapPinProps {
  x: number;
  y: number;
  count: number;
  friend: boolean;
  selected: boolean;
  onPress: () => void;
}

// Matches .pin/.halo/.core — a teardrop pin (a rotated rounded square,
// same trick the CSS uses) with a pulsing glow halo behind it. Friend pins
// are plum instead of ember; the selected pin turns gold/white and grows
// slightly; clusters (count > 1) show a counter-rotated number so the
// digit stays upright despite the pin's own rotation.
const PIN_HIT_SIZE = 42;

export function MapPin({ x, y, count, friend, selected, onPress }: MapPinProps) {
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 1200, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 1200, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  const haloScale = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.88, 1.24] });
  const haloOpacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.4, 0.85] });

  const isCluster = count > 1;
  const coreSize = selected ? 20 : isCluster ? 24 : 16;
  const radius = coreSize / 2;

  const gradientColors: [string, string] = selected
    ? [colors.gold, '#ffffff']
    : friend
      ? [colors.plum, '#d9c2e6']
      : [colors.ember, colors.emberSoft];

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.hitArea,
        { left: `${x}%`, top: `${y}%` },
      ]}
    >
      <Animated.View
        style={[
          styles.halo,
          { opacity: haloOpacity, transform: [{ scale: haloScale }] },
        ]}
      />
      <View
        style={[
          styles.coreWrap,
          { width: coreSize, height: coreSize, transform: [{ rotate: '-45deg' }] },
        ]}
      >
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            styles.coreGradient,
            {
              borderTopLeftRadius: radius,
              borderTopRightRadius: radius,
              borderBottomRightRadius: radius,
            },
          ]}
        />
        {isCluster && !selected && (
          <View style={styles.countWrap}>
            <Text style={styles.count}>{count}</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  hitArea: {
    position: 'absolute',
    width: PIN_HIT_SIZE,
    height: PIN_HIT_SIZE,
    marginLeft: -PIN_HIT_SIZE / 2,
    marginTop: -PIN_HIT_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  halo: {
    position: 'absolute',
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255,122,54,0.45)',
  },
  coreWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  coreGradient: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 1.5,
    borderColor: '#1a0f08',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  countWrap: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '45deg' }],
  },
  count: {
    fontSize: 10,
    fontFamily: fonts.bodyBold,
    color: '#1a0f08',
  },
});
