import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { ReactNode } from 'react';
import { Avatar } from '../Avatar';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/typography';

interface FriendRowProps {
  user: string;
  avatarIndex: number;
  subtitle: string;
  children: ReactNode;
}

// Matches .fr-row — avatar, bold name, subtitle, and a trailing action
// slot that differs depending on whether this is an incoming request
// (Accept/Decline) or a suggested person (Add).
export function FriendRow({ user, avatarIndex, subtitle, children }: FriendRowProps) {
  return (
    <View style={styles.row}>
      <Avatar username={user} avatarIndex={avatarIndex} size={44} />
      <View style={styles.meta}>
        <Text style={styles.name}>{user}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 9,
  },
  meta: {
    flex: 1,
    minWidth: 0,
  },
  name: {
    fontSize: 14,
    fontFamily: fonts.bodySemiBold,
    color: colors.text,
  },
  subtitle: {
    fontSize: 12,
    color: colors.muted,
    fontFamily: fonts.bodyRegular,
    marginTop: 1,
  },
});
