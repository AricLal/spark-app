import React, { useEffect, useState } from 'react';
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
import { AgeGate } from './src/components/AgeGate';
import { getAgeConfirmed, setAgeConfirmed } from './src/lib/ageGateStorage';
import { colors } from './src/theme/colors';

type AgeGateStatus = 'checking' | 'needsGate' | 'denied' | 'passed';

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

  // Matches initGate(): check AsyncStorage for a prior "yes" before
  // deciding whether to show the gate at all. The app tree below isn't
  // mounted until this resolves, so there's no flash of Feed/Map/etc.
  // underneath while the check is in flight — unlike the prototype's
  // visibility:hidden "checking" state, which briefly reveals whatever's
  // behind the gate since all screens are already mounted in that SPA.
  const [ageGateStatus, setAgeGateStatus] = useState<AgeGateStatus>('checking');

  useEffect(() => {
    getAgeConfirmed().then((confirmed) => {
      setAgeGateStatus(confirmed ? 'passed' : 'needsGate');
    });
  }, []);

  const handleConfirm = () => {
    setAgeGateStatus('passed');
    setAgeConfirmed();
  };

  // Matches denyAge() — a dead end, no retry, same as the prototype.
  const handleDeny = () => {
    setAgeGateStatus('denied');
  };

  if (!fontsReady || ageGateStatus === 'checking') {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={colors.ember} />
      </View>
    );
  }

  if (ageGateStatus !== 'passed') {
    return (
      <SafeAreaProvider>
        <StatusBar style="light" />
        <AgeGate
          denied={ageGateStatus === 'denied'}
          onConfirm={handleConfirm}
          onDeny={handleDeny}
        />
      </SafeAreaProvider>
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
