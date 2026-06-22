import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/typography';

interface SegmentedControlProps {
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
}

// Matches .seg/.seg-b — the Everyone/Friends filter pill.
export function SegmentedControl({ options, value, onChange }: SegmentedControlProps) {
  return (
    <View style={styles.seg}>
      {options.map((opt) => {
        const isOn = opt.value === value;
        return (
          <Pressable
            key={opt.value}
            onPress={() => onChange(opt.value)}
            style={[styles.segBtn, isOn && styles.segBtnOn]}
          >
            <Text style={[styles.segText, isOn && styles.segTextOn]}>{opt.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  seg: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 999,
    padding: 3,
  },
  segBtn: {
    paddingVertical: 6,
    paddingHorizontal: 13,
    borderRadius: 999,
  },
  segBtnOn: {
    backgroundColor: colors.surface2,
  },
  segText: {
    fontSize: 12,
    fontFamily: fonts.bodySemiBold,
    color: colors.muted,
  },
  segTextOn: {
    color: colors.text,
  },
});
