import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { avatarGradientFor } from '../theme/colors';
import { fonts } from '../theme/typography';

interface AvatarProps {
  username: string;
  avatarIndex: number;
  size?: number;
}

// Matches .ava — a circle filled with a gradient keyed off avatarIndex,
// showing the first letter of the username.
export function Avatar({ username, avatarIndex, size = 38 }: AvatarProps) {
  const [from, to] = avatarGradientFor(avatarIndex);
  const letter = username.charAt(0).toUpperCase();

  return (
    <LinearGradient
      colors={[from, to]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[
        styles.circle,
        { width: size, height: size, borderRadius: size / 2 },
      ]}
    >
      <Text style={[styles.letter, { fontSize: size * 0.37 }]}>{letter}</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  letter: {
    color: '#1a120c',
    fontFamily: fonts.bodyBold,
  },
});
