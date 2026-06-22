import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FeedHeader } from '../components/FeedHeader';
import { FeedCard } from '../components/FeedCard';
import { feedData, type FeedPost } from '../data/feedData';
import { colors } from '../theme/colors';

// Matches <section id="feed"> in the prototype — the home screen: wordmark
// header + a scrollable list of feed cards. Tapping a card is wired up via
// onOpenSession but the session-detail screen isn't built yet (out of
// scope for this first pass).
export function FeedScreen() {
  const handleOpenSession = (post: FeedPost) => {
    console.log('Open session detail for', post.user, '(not built yet)');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <FeedHeader requestCount={2} />
        <FlatList
          data={feedData}
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
