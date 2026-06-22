import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ScreenHeader } from './ScreenHeader';
import { useFriends } from '../context/FriendsContext';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';

// Matches .iconbtn.addfr / .fr-badge in the prototype: the add-friends
// button with its unread-request badge, slotted into the shared
// ScreenHeader's right-hand side. Tapping it opens the Friends panel
// (openAdd() in the prototype); the badge count is the real number of
// pending incoming requests rather than a hardcoded prop.
export function FeedHeader() {
  const { openFriends, pendingCount } = useFriends();

  return (
    <ScreenHeader
      title="Spark"
      rightContent={
        <Pressable onPress={openFriends}>
          <View style={styles.iconBtn}>
            <Feather name="users" size={18} color={colors.muted} />
          </View>
          {pendingCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{pendingCount}</Text>
            </View>
          )}
        </Pressable>
      }
    />
  );
}

const styles = StyleSheet.create({
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
