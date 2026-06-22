import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';

// Glyph + label for every route, keyed by route name. These are the exact
// unicode characters the prototype used for its nav icons (⌂ ◈ ✦ ♡ ◔) —
// matching them directly is more faithful than swapping in an icon font.
const TAB_META: Record<string, { icon: string; label: string }> = {
  Feed: { icon: '⌂', label: 'Feed' },
  Map: { icon: '◈', label: 'Map' },
  CheckIn: { icon: '✦', label: '' },
  Activity: { icon: '♡', label: 'Activity' },
  Profile: { icon: '◔', label: 'You' },
};

const CENTER_ROUTE = 'CheckIn';

// A from-scratch port of .nav / .nav button / .spark-btn in spark.html.
// Rendered entirely custom (rather than the default bottom-tabs bar)
// because the elevated, glowing center button and the bare-icon center
// slot aren't something the stock tab bar can produce.
export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  // Mirrors `clearActivityDot()` in the prototype: the unread dot on the
  // Activity icon starts lit and clears the first time that tab is tapped.
  const [hasUnreadActivity, setHasUnreadActivity] = useState(true);

  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={['transparent', colors.bg, colors.bg]}
        locations={[0, 0.4, 1]}
        style={StyleSheet.absoluteFillObject}
      />
      <View
        style={[
          styles.row,
          { paddingBottom: Math.max(insets.bottom, 12) },
        ]}
      >
        {state.routes.map((route, index) => {
          const meta = TAB_META[route.name];
          const isFocused = state.index === index;
          const isCenter = route.name === CENTER_ROUTE;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
            if (route.name === 'Activity') {
              setHasUnreadActivity(false);
            }
          };

          if (isCenter) {
            return (
              <Pressable
                key={route.key}
                onPress={onPress}
                style={styles.centerBtn}
                accessibilityRole="button"
                accessibilityLabel={descriptors[route.key].options.title ?? 'Spark'}
              >
                <LinearGradient
                  colors={[colors.ember, colors.emberSoft]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.centerGradient}
                >
                  <Text style={styles.centerIcon}>{meta.icon}</Text>
                </LinearGradient>
              </Pressable>
            );
          }

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              style={styles.tabBtn}
              accessibilityRole="button"
              accessibilityLabel={meta.label}
            >
              <View style={styles.iconSlot}>
                <Text style={[styles.icon, isFocused && styles.iconOn]}>
                  {meta.icon}
                </Text>
                {route.name === 'Activity' && hasUnreadActivity && (
                  <View style={styles.dot} />
                )}
              </View>
              <Text style={[styles.label, isFocused && styles.labelOn]}>
                {meta.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 18,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.navBorder,
  },
  tabBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  iconSlot: {
    position: 'relative',
  },
  icon: {
    fontSize: 21,
    lineHeight: 21,
    color: colors.dim,
  },
  iconOn: {
    color: colors.text,
  },
  label: {
    fontSize: 10,
    fontFamily: fonts.bodySemiBold,
    color: colors.dim,
  },
  labelOn: {
    color: colors.text,
  },
  dot: {
    position: 'absolute',
    top: -3,
    right: -5,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.ember,
    shadowColor: colors.ember,
    shadowOpacity: 0.9,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 0 },
  },
  centerBtn: {
    flex: 0,
    width: 60,
    height: 60,
    marginTop: -26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 6,
    borderColor: colors.bg,
    shadowColor: colors.ember,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.45,
    shadowRadius: 13,
    elevation: 10,
  },
  centerIcon: {
    fontSize: 27,
    color: '#1a0f08',
  },
});
