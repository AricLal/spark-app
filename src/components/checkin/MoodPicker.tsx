import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/typography';
import { moods } from '../../data/checkInOptions';

interface MoodPickerProps {
  selected: string | null;
  onSelect: (mood: string) => void;
}

// Matches .pills/.pill.mood — single-select mood chips. Re-tapping the
// selected pill doesn't deselect it, same as the prototype's pickMood().
export function MoodPicker({ selected, onSelect }: MoodPickerProps) {
  return (
    <View style={styles.row}>
      {moods.map((m) => {
        const isSelected = selected === m;
        return (
          <Pressable
            key={m}
            onPress={() => onSelect(m)}
            style={[styles.pill, isSelected && styles.pillSelected]}
          >
            <Text style={[styles.pillText, isSelected && styles.pillTextSelected]}>
              {m}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 9,
  },
  pill: {
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
  },
  pillSelected: {
    backgroundColor: 'rgba(185,156,201,0.16)',
    borderColor: colors.plum,
  },
  pillText: {
    fontSize: 13,
    fontFamily: fonts.bodySemiBold,
    color: colors.muted,
  },
  pillTextSelected: {
    color: colors.plum,
  },
});
