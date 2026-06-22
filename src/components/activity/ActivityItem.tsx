import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Avatar } from '../Avatar';
import { SceneArt } from '../SceneArt';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/typography';
import type { ActivityEntry } from '../../data/activityData';
import type { IncomingRequest } from '../../types/friend';

interface ActivityItemProps {
  item: ActivityEntry;
  request?: IncomingRequest;
  onAccept?: () => void;
  onDecline?: () => void;
}

// Matches .act-item — avatar with a small "kind" badge overlay, the
// notification text with a bolded username, a timestamp, and a trailing
// slot that's either a scene thumbnail, inline Accept/Decline, or nothing.
export function ActivityItem({ item, request, onAccept, onDecline }: ActivityItemProps) {
  return (
    <View style={[styles.item, item.unread && styles.itemUnread]}>
      <View style={styles.avaWrap}>
        <Avatar username={item.user} avatarIndex={item.avatarIndex} size={42} />
        <View style={[styles.kindBadge, { backgroundColor: item.badgeColor }]}>
          <Text style={styles.kindIcon}>{item.badgeIcon}</Text>
        </View>
      </View>

      <View style={styles.textWrap}>
        <Text style={styles.text}>
          <Text style={styles.textUser}>{item.user}</Text>
          {item.actionText}
        </Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>

      {item.isRequest ? (
        !request || request.status === 'pending' ? (
          <View style={styles.reqActs}>
            <Pressable onPress={onAccept} style={styles.reqYes}>
              <Text style={styles.reqYesText}>Accept</Text>
            </Pressable>
            <Pressable onPress={onDecline} style={styles.reqNo}>
              <Text style={styles.reqNoText}>Decline</Text>
            </Pressable>
          </View>
        ) : request.status === 'accepted' ? (
          <Text style={styles.reqDoneFriends}>✓ Friends</Text>
        ) : (
          <Text style={styles.reqDone}>Declined</Text>
        )
      ) : item.thumb ? (
        <View style={styles.thumb}>
          <SceneArt scene={item.thumb} gradientId={`act-${item.id}`} />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 13,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  itemUnread: {
    backgroundColor: 'rgba(255,122,54,0.07)',
    marginHorizontal: -10,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderBottomWidth: 0,
  },
  avaWrap: {
    position: 'relative',
  },
  kindBadge: {
    position: 'absolute',
    right: -3,
    bottom: -3,
    width: 19,
    height: 19,
    borderRadius: 9.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.bg,
  },
  kindIcon: {
    fontSize: 10,
  },
  textWrap: {
    flex: 1,
    minWidth: 0,
  },
  text: {
    fontSize: 13.5,
    lineHeight: 18,
    color: colors.text,
    fontFamily: fonts.bodyRegular,
  },
  textUser: {
    fontFamily: fonts.bodySemiBold,
  },
  time: {
    fontSize: 11.5,
    color: colors.dim,
    fontFamily: fonts.bodyRegular,
    marginTop: 2,
  },
  thumb: {
    width: 42,
    height: 50,
    borderRadius: 9,
    overflow: 'hidden',
  },
  reqActs: {
    flexDirection: 'row',
    gap: 7,
    flexShrink: 0,
  },
  reqYes: {
    backgroundColor: colors.ember,
    paddingVertical: 8,
    paddingHorizontal: 13,
    borderRadius: 999,
  },
  reqYesText: {
    fontSize: 12,
    fontFamily: fonts.bodyBold,
    color: '#1a0f08',
  },
  reqNo: {
    backgroundColor: colors.surface2,
    borderWidth: 1,
    borderColor: colors.line,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
  },
  reqNoText: {
    fontSize: 12,
    fontFamily: fonts.bodySemiBold,
    color: colors.muted,
  },
  reqDone: {
    fontSize: 12,
    fontFamily: fonts.bodyBold,
    color: colors.muted,
  },
  reqDoneFriends: {
    fontSize: 12,
    fontFamily: fonts.bodyBold,
    color: colors.gold,
  },
});
