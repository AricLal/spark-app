import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, type NavigationProp } from '@react-navigation/native';
import { ScreenHeader } from '../components/ScreenHeader';
import { CaptureBox } from '../components/checkin/CaptureBox';
import { StrainField } from '../components/checkin/StrainField';
import { MoodPicker } from '../components/checkin/MoodPicker';
import { RatingStars } from '../components/checkin/RatingStars';
import { PostedOverlay } from '../components/checkin/PostedOverlay';
import { useFeed } from '../context/FeedContext';
import { sceneCycle } from '../data/checkInOptions';
import type { SceneType } from '../data/feedData';
import type { RootTabParamList } from '../navigation/RootNavigator';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';

const POSTED_OVERLAY_MS = 1900;

// A faithful port of <section id="checkin"> — photo capture, then optional
// strain / mood / rating, then post. Every optional field is genuinely
// optional: a photo alone is enough to post, matching the prototype's
// "friction kills capture apps" design note in the MVP spec.
export function CheckInScreen() {
  const navigation = useNavigation<NavigationProp<RootTabParamList>>();
  const { addPost } = useFeed();

  const [scene, setScene] = useState<SceneType | null>(null);
  const [strainQuery, setStrainQuery] = useState('');
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [mood, setMood] = useState<string | null>(null);
  const [rating, setRating] = useState(0);
  const [posted, setPosted] = useState(false);

  const strain = strainQuery.trim() ? strainQuery.trim() : null;
  const hasShot = scene !== null;
  const hasExtras = Boolean(strain || mood || rating > 0);
  const buttonLabel = !hasShot
    ? 'Add a photo to spark'
    : hasExtras
      ? 'Spark it ✦'
      : 'Spark just the moment ✦';

  function handleCapture() {
    const next = sceneCycle[Math.floor(Math.random() * sceneCycle.length)];
    setScene(next);
  }

  function handleRetake() {
    setScene(null);
  }

  function handleChangeQuery(text: string) {
    setStrainQuery(text);
    setSuggestionsOpen(text.trim().length > 0);
  }

  function handleSelectStrain(s: string) {
    setStrainQuery(s);
    setSuggestionsOpen(false);
  }

  function handleClearStrain() {
    setStrainQuery('');
    setSuggestionsOpen(false);
  }

  function resetForm() {
    setScene(null);
    setStrainQuery('');
    setSuggestionsOpen(false);
    setMood(null);
    setRating(0);
  }

  function handlePost() {
    if (!scene) return;
    const bare = !hasExtras;

    addPost({
      id: `local-${Date.now()}`,
      user: 'jmax',
      location: 'Denver',
      scene,
      strain,
      mood,
      rating,
      likes: 0,
      passes: 0,
      caption: bare ? 'the view tonight 🌄' : 'just sparked one ✦',
      avatarIndex: 2,
    });

    setPosted(true);
    setTimeout(() => {
      setPosted(false);
      resetForm();
      navigation.navigate('Feed');
    }, POSTED_OVERLAY_MS);
  }

  return (
    <View style={styles.root}>
      <ScreenHeader title="New session" />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.stepHeading}>Capture the moment</Text>
          <Text style={styles.stepSub}>
            Just the shot is enough. Add the rest only if you feel like it.
          </Text>

          <CaptureBox scene={scene} onCapture={handleCapture} onRetake={handleRetake} />

          <View style={styles.optionalRow}>
            <Text style={[styles.label, styles.optionalLabel]}>Add details</Text>
            <View style={styles.optionalTag}>
              <Text style={styles.optionalTagText}>Optional</Text>
            </View>
          </View>

          <Text style={[styles.label, styles.strainLabel]}>What are you smoking?</Text>
          <StrainField
            query={strainQuery}
            onChangeQuery={handleChangeQuery}
            onSelect={handleSelectStrain}
            onClear={handleClearStrain}
            showSuggestions={suggestionsOpen}
          />

          <Text style={styles.label}>How's the vibe?</Text>
          <MoodPicker selected={mood} onSelect={setMood} />

          <Text style={styles.label}>Rate it</Text>
          <RatingStars rating={rating} onSetRating={setRating} />

          <Pressable
            onPress={handlePost}
            disabled={!hasShot}
            style={[styles.postBtnWrap, !hasShot && styles.postBtnWrapDisabled]}
          >
            <LinearGradient
              colors={[colors.ember, colors.emberSoft]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.postBtnGradient}
            >
              <Text style={styles.postBtnText}>{buttonLabel}</Text>
            </LinearGradient>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>

      <PostedOverlay visible={posted} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 30,
  },
  stepHeading: {
    fontFamily: fonts.displayBold,
    fontSize: 24,
    color: colors.text,
    letterSpacing: -0.3,
    marginTop: 6,
    marginBottom: 4,
  },
  stepSub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 13,
    color: colors.muted,
    marginBottom: 18,
  },
  label: {
    fontSize: 12,
    fontFamily: fonts.bodySemiBold,
    color: colors.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.7,
    marginTop: 22,
    marginBottom: 11,
  },
  optionalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 26,
    paddingTop: 18,
    borderTopWidth: 1,
    borderTopColor: colors.line,
  },
  optionalLabel: {
    marginTop: 0,
    marginBottom: 0,
  },
  strainLabel: {
    marginTop: 16,
  },
  optionalTag: {
    fontSize: 11,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    paddingVertical: 3,
    paddingHorizontal: 9,
    borderRadius: 999,
  },
  optionalTagText: {
    fontSize: 11,
    fontFamily: fonts.bodySemiBold,
    color: colors.dim,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  postBtnWrap: {
    marginTop: 30,
    borderRadius: 18,
    shadowColor: colors.ember,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.32,
    shadowRadius: 15,
    elevation: 8,
  },
  postBtnWrapDisabled: {
    opacity: 0.4,
    shadowOpacity: 0,
    elevation: 0,
  },
  postBtnGradient: {
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postBtnText: {
    fontFamily: fonts.displayBold,
    fontSize: 16,
    color: '#1a0f08',
    letterSpacing: -0.2,
  },
});
