import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSessionDetail } from '../context/SessionDetailContext';
import { SessionDetailScreen } from '../screens/SessionDetailScreen';
import { colors } from '../theme/colors';

// Matches .fullmodal — a global overlay, not a routed screen, so it covers
// everything underneath it including the bottom tab bar (z-index 95 in the
// prototype, above the nav's z-index 40). Slides in from the right + fades
// in on open, matching the slideIn keyframe; closes instantly with no exit
// animation, same as the prototype's class toggle.
export function SessionDetailOverlay() {
  const { session } = useSessionDetail();
  const translateX = useRef(new Animated.Value(30)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (session) {
      translateX.setValue(30);
      opacity.setValue(0);
      Animated.timing(translateX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [session, translateX, opacity]);

  if (!session) return null;

  return (
    <Animated.View
      style={[
        styles.overlay,
        { transform: [{ translateX }], opacity },
      ]}
    >
      <SafeAreaView style={styles.flex} edges={['top']}>
        <SessionDetailScreen />
      </SafeAreaView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.bg,
    zIndex: 95,
  },
  flex: {
    flex: 1,
  },
});
