import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/typography';
import { strains, popularStrains } from '../../data/checkInOptions';

interface StrainFieldProps {
  query: string;
  onChangeQuery: (text: string) => void;
  onSelect: (strain: string) => void;
  onClear: () => void;
  showSuggestions: boolean;
}

type SuggestionRow =
  | { type: 'match'; value: string }
  | { type: 'add'; value: string };

// Matches .strain-field / .si-wrap / .suggest / .pills: a freeform search
// input — typing alone counts as tagging a strain, matching the prototype's
// "add your own" behavior — plus a popular-strain quick-pick row. Fully
// controlled from CheckInScreen so resetting the form after posting is just
// the parent clearing its own state.
export function StrainField({
  query,
  onChangeQuery,
  onSelect,
  onClear,
  showSuggestions,
}: StrainFieldProps) {
  const [focused, setFocused] = useState(false);
  const trimmed = query.trim();

  const matches = useMemo(() => {
    if (!trimmed) return [];
    const q = trimmed.toLowerCase();
    return strains.filter((s) => s.toLowerCase().includes(q)).slice(0, 5);
  }, [trimmed]);

  const hasExactMatch = useMemo(
    () => strains.some((s) => s.toLowerCase() === trimmed.toLowerCase()),
    [trimmed]
  );

  const rows: SuggestionRow[] = [
    ...matches.map((m): SuggestionRow => ({ type: 'match', value: m })),
    ...(!hasExactMatch ? ([{ type: 'add', value: trimmed }] as SuggestionRow[]) : []),
  ];

  return (
    <View>
      <View style={[styles.inputWrap, focused && styles.inputWrapFocused]}>
        <Text style={styles.inputIcon}>🌿</Text>
        <TextInput
          value={query}
          onChangeText={onChangeQuery}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Search or type any strain…"
          placeholderTextColor={colors.dim}
          autoCapitalize="words"
          autoCorrect={false}
          style={styles.input}
        />
        {query.length > 0 && (
          <Pressable onPress={onClear} style={styles.clearBtn}>
            <Text style={styles.clearText}>✕</Text>
          </Pressable>
        )}
      </View>

      {showSuggestions && rows.length > 0 && (
        <View style={styles.suggestBox}>
          {rows.map((row, i) => {
            const isLast = i === rows.length - 1;
            return (
              <Pressable
                key={`${row.type}-${row.value}`}
                onPress={() => onSelect(row.value)}
                style={[styles.suggestRow, isLast && styles.suggestRowLast]}
              >
                {row.type === 'match' ? (
                  <>
                    <Text style={styles.suggestIcon}>🌿</Text>
                    <Text style={styles.suggestText}>{row.value}</Text>
                  </>
                ) : (
                  <>
                    <Text style={[styles.suggestIcon, styles.addIcon]}>＋</Text>
                    <Text style={[styles.suggestText, styles.addText]}>
                      Add "{row.value}"
                    </Text>
                    <Text style={styles.suggestSub}>new strain</Text>
                  </>
                )}
              </Pressable>
            );
          })}
        </View>
      )}

      <Text style={styles.popLabel}>Popular right now</Text>
      <View style={styles.pillsRow}>
        {popularStrains.map((s) => {
          const isSelected = trimmed.toLowerCase() === s.toLowerCase();
          return (
            <Pressable
              key={s}
              onPress={() => onSelect(s)}
              style={[styles.pill, isSelected && styles.pillSelected]}
            >
              <Text style={[styles.pillText, isSelected && styles.pillTextSelected]}>
                {s}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 14,
    paddingHorizontal: 13,
  },
  inputWrapFocused: {
    borderColor: colors.ember,
  },
  inputIcon: {
    fontSize: 15,
    opacity: 0.8,
  },
  input: {
    flex: 1,
    color: colors.text,
    fontFamily: fonts.bodyMedium,
    fontSize: 15,
    paddingVertical: 13,
  },
  clearBtn: {
    padding: 6,
  },
  clearText: {
    color: colors.dim,
    fontSize: 13,
  },
  suggestBox: {
    marginTop: 7,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.surface,
  },
  suggestRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  suggestRowLast: {
    borderBottomWidth: 0,
  },
  suggestIcon: {
    fontSize: 14,
    opacity: 0.7,
  },
  suggestText: {
    fontSize: 14,
    fontFamily: fonts.bodyMedium,
    color: colors.text,
  },
  addIcon: {
    opacity: 1,
    color: colors.gold,
  },
  addText: {
    color: colors.gold,
  },
  suggestSub: {
    marginLeft: 'auto',
    fontSize: 11,
    fontFamily: fonts.bodySemiBold,
    color: colors.dim,
  },
  popLabel: {
    fontSize: 11,
    fontFamily: fonts.bodySemiBold,
    color: colors.dim,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginTop: 16,
    marginBottom: 10,
  },
  pillsRow: {
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
    backgroundColor: 'rgba(255,122,54,0.16)',
    borderColor: colors.ember,
  },
  pillText: {
    fontSize: 13,
    fontFamily: fonts.bodySemiBold,
    color: colors.muted,
  },
  pillTextSelected: {
    color: colors.gold,
  },
});
