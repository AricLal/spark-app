import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FeedHeader } from '../components/FeedHeader';
import { FeedCard } from '../components/FeedCard';
import { useFeed } from '../context/FeedContext';
import { useSessionDetail } from '../context/SessionDetailContext';
import type { FeedPost } from '../data/feedData';
import { colors } from '../theme/colors';

// Matches <section id="feed"> in the prototype — the home screen: wordmark
// header + a scrollable list of feed cards. Tapping a card's photo opens
// the session detail overlay (openSessionFromFeed in the prototype).
export function FeedScreen() {
  const { posts } = useFeed();
  const { openSession } = useSessionDetail();

  const handleOpenSession = (post: FeedPost) => {
    openSession({
      user: post.user,
      avatarIndex: post.avatarIndex,
      location: post.location,
      scene: post.scene,
      strain: post.strain,
      mood: post.mood,
      rating: post.rating,
      likes: post.likes,
      passes: post.passes,
      caption: post.caption,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <FeedHeader requestCount={2} />
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <FeedCard post={item} onOpenSession={handleOpenSession} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
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
    paddingTop: 4,
    paddingBottom: 24,
  },
});
