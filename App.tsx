import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DarkTheme, type Theme } from '@react-navigation/native';
import { useFonts as useInterFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { useFonts as useBricolageFonts, BricolageGrotesque_700Bold, BricolageGrotesque_800ExtraBold } from '@expo-google-fonts/bricolage-grotesque';
import { RootNavigator } from './src/navigation/RootNavigator';
import { FeedProvider } from './src/context/FeedContext';
import { SessionDetailProvider } from './src/context/SessionDetailContext';
import { SessionDetailOverlay } from './src/components/SessionDetailOverlay';
import { FriendsProvider } from './src/context/FriendsContext';
import { FriendsModal } from './src/components/friends/FriendsModal';
import { colors } from './src/theme/colors';

// Keeps screen-transition backgrounds and the system nav theme aligned with
// the prototype's palette instead of React Navigation's default dark theme.
const navTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.bg,
    card: colors.bg,
    border: colors.navBorder,
    primary: colors.ember,
    text: colors.text,
  },
};

export default function App() {
  const [interLoaded] = useInterFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });
  const [bricolageLoaded] = useBricolageFonts({
    BricolageGrotesque_700Bold,
    BricolageGrotesque_800ExtraBold,
  });

  const fontsReady = interLoaded && bricolageLoaded;

  if (!fontsReady) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={colors.ember} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <FeedProvider>
        <FriendsProvider>
          <SessionDetailProvider>
            <NavigationContainer theme={navTheme}>
              <RootNavigator />
            </NavigationContainer>
            <SessionDetailOverlay />
            <FriendsModal />
          </SessionDetailProvider>
        </FriendsProvider>
      </FeedProvider>
    </SafeAreaProvider>
  );
}
