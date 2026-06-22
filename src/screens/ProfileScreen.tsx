import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ProfileGrid } from '../components/profile/ProfileGrid';
import { profile, topStrains, recentSessionScenes } from '../data/profileData';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';

const stats = [
  { value: profile.sessions, label: 'Sessions' },
  { value: profile.strains, label: 'Strains' },
  { value: profile.spots, label: 'Spots' },
];

// A port of <section id="profile"> — notably the one screen in the
// prototype with no topbar/wordmark header at all; it goes straight into
// the centered avatar block, unlike Feed/Map/Activity/check-in.
export function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.head}>
          <LinearGradient
            colors={[colors.ember, colors.gold]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.avatar}
          >
            <Text style={styles.avatarLetter}>
              {profile.username.charAt(0).toUpperCase()}
            </Text>
          </LinearGradient>
          <Text style={styles.name}>{profile.username}</Text>
          <Text style={styles.subtitle}>
            📍 {profile.location} · {profile.joinedLabel}
          </Text>
        </View>

        <View style={styles.statsRow}>
          {stats.map((s, i) => (
            <View key={s.label} style={styles.stat}>
              {i > 0 && <View style={styles.statDivider} />}
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionLabel}>Your top strains</Text>
        <View style={styles.topList}>
          {topStrains.map((s, i) => (
            <View key={s.name} style={styles.topItem}>
              <Text style={styles.rank}>{i + 1}</Text>
              <Text style={styles.topName}>{s.name}</Text>
              <Text style={styles.miniStars}>{'★'.repeat(s.rating)}</Text>
              <Text style={styles.logCount}>{s.logs} logs</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionLabel}>Recent sessions</Text>
        <ProfileGrid scenes={recentSessionScenes} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  head: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 6,
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: colors.ember,
    shadowOpacity: 0.3,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8,
  },
  avatarLetter: {
    fontFamily: fonts.displayExtraBold,
    fontSize: 32,
    color: '#1a120c',
  },
  name: {
    fontFamily: fonts.displayBold,
    fontSize: 22,
    color: colors.text,
    letterSpacing: -0.2,
  },
  subtitle: {
    fontSize: 13,
    color: colors.muted,
    fontFamily: fonts.bodyRegular,
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 14,
    marginVertical: 18,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 20,
    overflow: 'hidden',
  },
  stat: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 6,
  },
  statDivider: {
    position: 'absolute',
    left: 0,
    top: '18%',
    height: '64%',
    width: 1,
    backgroundColor: colors.line,
  },
  statValue: {
    fontFamily: fonts.displayBold,
    fontSize: 21,
    color: colors.text,
  },
  statLabel: {
    fontSize: 11,
    color: colors.muted,
    fontFamily: fonts.bodySemiBold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 2,
  },
  sectionLabel: {
    fontSize: 12,
    fontFamily: fonts.bodyBold,
    color: colors.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    paddingHorizontal: 20,
    paddingTop: 6,
    paddingBottom: 12,
  },
  topList: {
    paddingHorizontal: 14,
  },
  topItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 9,
  },
  rank: {
    fontFamily: fonts.displayExtraBold,
    fontSize: 16,
    color: colors.ember,
    width: 22,
  },
  topName: {
    flex: 1,
    fontSize: 14,
    fontFamily: fonts.bodySemiBold,
    color: colors.text,
  },
  miniStars: {
    fontSize: 12,
    fontFamily: fonts.bodyBold,
    color: colors.gold,
  },
  logCount: {
    fontSize: 12,
    color: colors.muted,
    fontFamily: fonts.bodyRegular,
  },
});
