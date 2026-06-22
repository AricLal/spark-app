import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenHeader } from '../components/ScreenHeader';
import { SegmentedControl } from '../components/map/SegmentedControl';
import { MapBackground } from '../components/map/MapBackground';
import { MapPin } from '../components/map/MapPin';
import { MapSheet } from '../components/map/MapSheet';
import { mapSessions } from '../data/mapData';
import { useSessionDetail } from '../context/SessionDetailContext';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';

type MapFilter = 'all' | 'friends';

// A port of <section id="map"> — glowing pins over a stylized map, an
// Everyone/Friends filter, and a tap-a-pin bottom sheet whose "View
// session" button opens the same session detail overlay the Feed uses.
// Matches openSessionFromMap()'s rating/likes/passes/caption fallbacks
// exactly (mapSessions has no rate field, so rating defaults to 4 when a
// strain is tagged, 0 otherwise).
export function MapScreen() {
  const { openSession } = useSessionDetail();
  const [filter, setFilter] = useState<MapFilter>('all');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [sheetVisible, setSheetVisible] = useState(false);

  const visibleSessions =
    filter === 'friends' ? mapSessions.filter((s) => s.friend) : mapSessions;
  const selectedSession = selectedIndex !== null ? mapSessions[selectedIndex] : null;

  function handleFilterChange(next: string) {
    setFilter(next as MapFilter);
    setSheetVisible(false);
  }

  function handlePinPress(idx: number) {
    setSelectedIndex(idx);
    setSheetVisible(true);
  }

  function handleViewSession() {
    if (selectedIndex === null) return;
    const session = mapSessions[selectedIndex];
    openSession({
      user: session.user,
      avatarIndex: selectedIndex,
      location: `Around ${session.area}`,
      scene: session.scene,
      strain: session.strain,
      mood: session.mood,
      rating: session.strain ? 4 : 0,
      likes: 24 + selectedIndex * 9,
      passes: 6 + selectedIndex * 3,
      caption: session.strain ? 'good company, better view 🌿' : 'no notes, just this 🌅',
    });
    setSheetVisible(false);
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <ScreenHeader
          title="Live map"
          rightContent={
            <SegmentedControl
              value={filter}
              onChange={handleFilterChange}
              options={[
                { label: 'Everyone', value: 'all' },
                { label: 'Friends', value: 'friends' },
              ]}
            />
          }
        />

        <View style={styles.privacyNote}>
          <Text style={styles.privacyText}>
            📍 Spots are approximate — exact location is never shown
          </Text>
        </View>

        <View style={styles.mapWrap}>
          <MapBackground />
          {visibleSessions.map((s) => {
            const idx = mapSessions.indexOf(s);
            return (
              <MapPin
                key={idx}
                x={s.x}
                y={s.y}
                count={s.count}
                friend={s.friend}
                selected={selectedIndex === idx}
                onPress={() => handlePinPress(idx)}
              />
            );
          })}
        </View>

        <MapSheet
          session={selectedSession}
          visible={sheetVisible}
          onClose={() => setSheetVisible(false)}
          onViewSession={handleViewSession}
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
  privacyNote: {
    marginHorizontal: 16,
    marginBottom: 10,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  privacyText: {
    fontSize: 11,
    color: colors.dim,
    fontFamily: fonts.bodyRegular,
  },
  mapWrap: {
    flex: 1,
    marginHorizontal: 14,
    marginBottom: 14,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: '#120d0a',
  },
});
