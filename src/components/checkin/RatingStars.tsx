import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../theme/colors';

interface RatingStarsProps {
  rating: number;
  onSetRating: (n: number) => void;
}

// Matches .ratewrap/.rstar — five tappable stars, lit up to the chosen
// count, with the same ember glow on lit stars as the prototype's
// text-shadow. No tap-to-clear, same as setRate() in the prototype.
export function RatingStars({ rating, onSetRating }: RatingStarsProps) {
  return (
    <View style={styles.row}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Pressable key={n} onPress={() => onSetRating(n)} hitSlop={6}>
          <Text style={[styles.star, n <= rating && styles.starLit]}>★</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  star: {
    fontSize: 34,
    lineHeight: 38,
    color: colors.line,
  },
  starLit: {
    color: colors.ember,
    textShadowColor: 'rgba(255,122,54,0.55)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
});
