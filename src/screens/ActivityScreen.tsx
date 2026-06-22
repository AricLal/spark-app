import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenHeader } from '../components/ScreenHeader';
import { ActivityItem } from '../components/activity/ActivityItem';
import { activityData } from '../data/activityData';
import { useFriends } from '../context/FriendsContext';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';

// A port of <section id="activity"> — day-grouped notifications: cheers,
// comments, friend requests with inline Accept/Decline, and "sparked near
// you" pings. The friend-request item shares its accept/decline state
// with the Friends panel via FriendsContext (see that context's comment
// for why), rather than tracking its own disconnected copy.
export function ActivityScreen() {
  const { incoming, acceptRequest, declineRequest } = useFriends();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <ScreenHeader title="Activity" />
        <ScrollView
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        >
          {activityData.map((group) => (
            <View key={group.day}>
              <Text style={styles.dayLabel}>{group.day}</Text>
              {group.items.map((item) => {
                const request = item.isRequest
                  ? incoming.find((r) => r.user === item.user)
                  : undefined;
                return (
                  <ActivityItem
                    key={item.id}
                    item={item}
                    request={request}
                    onAccept={() => request && acceptRequest(request.id)}
                    onDecline={() => request && declineRequest(request.id)}
                  />
                );
              })}
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  listContent: {
    paddingHorizontal: 14,
    paddingBottom: 20,
  },
  dayLabel: {
    fontSize: 11,
    fontFamily: fonts.bodyBold,
    color: colors.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.7,
    paddingTop: 16,
    paddingBottom: 8,
    paddingHorizontal: 4,
  },
});
