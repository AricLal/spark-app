import AsyncStorage from '@react-native-async-storage/async-storage';

const AGE_CONFIRMED_KEY = 'spark.ageConfirmed';

// Matches initGate()/enterApp() in the prototype, which used
// window.storage.get/set('ageConfirmed', ...) wrapped in try/catch with a
// silent fallback ("first visit or storage unavailable"). Same shape here
// with AsyncStorage: failures are swallowed rather than surfaced, so a
// storage error just means the gate asks again next time instead of
// crashing the app.
export async function getAgeConfirmed(): Promise<boolean> {
  try {
    const value = await AsyncStorage.getItem(AGE_CONFIRMED_KEY);
    return value === '1';
  } catch {
    return false;
  }
}

export async function setAgeConfirmed(): Promise<void> {
  try {
    await AsyncStorage.setItem(AGE_CONFIRMED_KEY, '1');
  } catch {
    // best-effort, same as the prototype
  }
}
