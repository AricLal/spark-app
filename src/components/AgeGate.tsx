import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';

interface AgeGateProps {
  denied: boolean;
  onConfirm: () => void;
  onDeny: () => void;
}

// A port of #gate/#gateInner — the 21+ splash that's the first thing
// rendered on launch (App.tsx doesn't mount the real app tree at all
// until this is passed, rather than layering it on top of an already-
// mounted app like the prototype's absolutely-positioned overlay does).
// Tapping "No" replaces the form with a dead-end denial message, exactly
// like denyAge() — no retry, matching the prototype.
export function AgeGate({ denied, onConfirm, onDeny }: AgeGateProps) {
  const glowPulse = useRef(new Animated.Value(0)).current;
  const dotPulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const glowLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(glowPulse, { toValue: 1, duration: 1500, useNativeDriver: true }),
        Animated.timing(glowPulse, { toValue: 0, duration: 1500, useNativeDriver: true }),
      ])
    );
    const dotLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(dotPulse, { toValue: 1, duration: 1300, useNativeDriver: true }),
        Animated.timing(dotPulse, { toValue: 0, duration: 1300, useNativeDriver: true }),
      ])
    );
    glowLoop.start();
    dotLoop.start();
    return () => {
      glowLoop.stop();
      dotLoop.stop();
    };
  }, [glowPulse, dotPulse]);

  const glowOpacity = glowPulse.interpolate({ inputRange: [0, 1], outputRange: [0.5, 1] });
  const glowScale = glowPulse.interpolate({ inputRange: [0, 1], outputRange: [0.9, 1.08] });
  const dotOpacity = dotPulse.interpolate({ inputRange: [0, 1], outputRange: [0.7, 1] });
  const dotScale = dotPulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.25] });

  return (
    <View style={styles.root}>
      <Svg style={StyleSheet.absoluteFillObject} viewBox="0 0 100 100">
        <Defs>
          <RadialGradient id="gateBg" cx="50%" cy="12%" r="70%">
            <Stop offset="0" stopColor="#2a1d14" />
            <Stop offset="0.6" stopColor="#100b08" />
          </RadialGradient>
        </Defs>
        <Rect width={100} height={100} fill="url(#gateBg)" />
      </Svg>

      <Animated.View
        style={[styles.glow, { opacity: glowOpacity, transform: [{ scale: glowScale }] }]}
      />

      <View style={styles.inner}>
        <View style={styles.mark}>
          <Animated.View
            style={[styles.dot, { opacity: dotOpacity, transform: [{ scale: dotScale }] }]}
          />
          <Text style={styles.markText}>Spark</Text>
        </View>

        {denied ? (
          <View style={styles.deniedWrap}>
            <Text style={styles.deniedTitle}>Come back when you're 21.</Text>
            <Text style={styles.deniedBody}>
              You must be of legal age to use Spark. Thanks for stopping by.
            </Text>
          </View>
        ) : (
          <>
            <Text style={styles.heading}>Are you 21 or older?</Text>
            <Text style={styles.body}>You must be of legal age to enter Spark.</Text>

            <Pressable onPress={onConfirm} style={styles.yesWrap}>
              <LinearGradient
                colors={[colors.ember, colors.emberSoft]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.yesGradient}
              >
                <Text style={styles.yesText}>Yes, I'm 21+</Text>
              </LinearGradient>
            </Pressable>

            <Pressable onPress={onDeny} style={styles.noBtn}>
              <Text style={styles.noText}>No</Text>
            </Pressable>

            <Text style={styles.fine}>
              By entering you confirm you meet the legal age in your region.
            </Text>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#100b08',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 34,
  },
  glow: {
    position: 'absolute',
    top: '14%',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255,122,54,0.22)',
  },
  inner: {
    alignItems: 'center',
  },
  mark: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    marginBottom: 54,
  },
  dot: {
    width: 11,
    height: 11,
    borderRadius: 5.5,
    backgroundColor: colors.ember,
    shadowColor: colors.ember,
    shadowOpacity: 0.9,
    shadowRadius: 9,
    shadowOffset: { width: 0, height: 0 },
  },
  markText: {
    fontFamily: fonts.displayExtraBold,
    fontSize: 32,
    color: colors.text,
    letterSpacing: -0.6,
  },
  heading: {
    fontFamily: fonts.displayBold,
    fontSize: 25,
    color: colors.text,
    letterSpacing: -0.25,
    marginBottom: 10,
    textAlign: 'center',
  },
  body: {
    fontSize: 14,
    color: colors.muted,
    fontFamily: fonts.bodyRegular,
    lineHeight: 21,
    maxWidth: 240,
    textAlign: 'center',
    marginBottom: 32,
  },
  yesWrap: {
    width: '100%',
    maxWidth: 260,
    borderRadius: 16,
    shadowColor: colors.ember,
    shadowOpacity: 0.32,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },
  yesGradient: {
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  yesText: {
    fontFamily: fonts.displayBold,
    fontSize: 16,
    color: '#1a0f08',
    letterSpacing: -0.2,
  },
  noBtn: {
    width: '100%',
    maxWidth: 260,
    marginTop: 12,
    paddingVertical: 15,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noText: {
    fontSize: 15,
    fontFamily: fonts.bodySemiBold,
    color: colors.muted,
  },
  fine: {
    fontSize: 11,
    color: colors.dim,
    fontFamily: fonts.bodyRegular,
    lineHeight: 16.5,
    maxWidth: 230,
    textAlign: 'center',
    marginTop: 26,
  },
  deniedWrap: {
    alignItems: 'center',
  },
  deniedTitle: {
    fontFamily: fonts.displayBold,
    fontSize: 20,
    color: colors.text,
    marginBottom: 10,
    textAlign: 'center',
  },
  deniedBody: {
    fontSize: 15,
    color: colors.muted,
    fontFamily: fonts.bodyRegular,
    lineHeight: 24,
    maxWidth: 250,
    textAlign: 'center',
  },
});
