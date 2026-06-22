import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Wordmark } from './Wordmark';

interface ScreenHeaderProps {
  title: string;
  rightContent?: React.ReactNode;
}

// Matches .topbar — wordmark on the left, an optional action slot on the
// right (Feed uses this for the add-friends button; check-in leaves it empty).
export function ScreenHeader({ title, rightContent }: ScreenHeaderProps) {
  return (
    <View style={styles.topbar}>
      <Wordmark title={title} />
      {rightContent}
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
});
