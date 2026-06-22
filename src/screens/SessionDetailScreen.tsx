import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SceneArt } from '../components/SceneArt';
import { Avatar } from '../components/Avatar';
import { PhotoBadges } from '../components/PhotoBadges';
import { sampleComments, type SessionComment } from '../data/sessionComments';
import { useSessionDetail } from '../context/SessionDetailContext';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';

// A port of buildSessionView(s) — full photo, strain/mood/rating, heart +
// Pass reactions (state local to this view, separate from the feed card's
// own reaction state, same as svLike()/svPass() operating on the modal
// independently of the card it was opened from), caption, and comments.
//
// One small, deliberate addition beyond the prototype: the comment "Post"
// button there had no handler wired (visual only). Posting a comment here
// actually appends it locally, since it costs nothing and the static
// button would otherwise do nothing when tapped.
export function SessionDetailScreen() {
  const { session, closeSession } = useSessionDetail();

  const [liked, setLiked] = useState(false);
  const [passed, setPassed] = useState(false);
  const [comments, setComments] = useState<SessionComment[]>(sampleComments);
  const [commentText, setCommentText] = useState('');

  if (!session) return null;

  const likeCount = session.likes + (liked ? 1 : 0);

  function handlePostComment() {
    const text = commentText.trim();
    if (!text) return;
    setComments((prev) => [
      ...prev,
      { id: `local-${Date.now()}`, user: 'jmax', avatarIndex: 2, text },
    ]);
    setCommentText('');
  }

  return (
    <View style={styles.root}>
      <View style={styles.top}>
        <Pressable onPress={closeSession} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.body}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.photo}>
            <SceneArt scene={session.scene} gradientId="session-detail" />
            <PhotoBadges
              strain={session.strain}
              mood={session.mood}
              rating={session.rating}
            />
          </View>

          <View style={styles.head}>
            <Avatar username={session.user} avatarIndex={session.avatarIndex} size={40} />
            <View style={styles.who}>
              <Text style={styles.whoName}>{session.user}</Text>
              <Text style={styles.whoLoc}>📍 {session.location} · just now</Text>
            </View>
          </View>

          <Text style={styles.caption}>
            <Text style={styles.captionUser}>{session.user} </Text>
            {session.caption}
          </Text>

          <View style={styles.reactRow}>
            <Pressable
              onPress={() => setLiked((p) => !p)}
              style={[styles.reactBtn, liked && styles.reactBtnOn]}
            >
              <Text style={[styles.reactIcon, liked && styles.reactIconOn]}>
                {liked ? '♥' : '♡'}
              </Text>
              <Text style={[styles.reactLabel, liked && styles.reactLabelOn]}>
                {likeCount}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setPassed((p) => !p)}
              style={[styles.reactBtn, passed && styles.reactBtnOn]}
            >
              <Text style={[styles.reactIcon, passed && styles.reactIconOn]}>💨</Text>
              <Text style={[styles.reactLabel, passed && styles.reactLabelOn]}>
                {passed ? 'Passed' : 'Pass'}
              </Text>
            </Pressable>
          </View>

          <Text style={styles.cmtLabel}>Comments</Text>
          {comments.map((c) => (
            <View key={c.id} style={styles.cmt}>
              <Avatar username={c.user} avatarIndex={c.avatarIndex} size={32} />
              <Text style={styles.cmtText}>
                <Text style={styles.cmtUser}>{c.user}</Text> {c.text}
              </Text>
            </View>
          ))}

          <View style={styles.cmtInputWrap}>
            <TextInput
              value={commentText}
              onChangeText={setCommentText}
              placeholder="Add a comment…"
              placeholderTextColor={colors.dim}
              style={styles.cmtInput}
              onSubmitEditing={handlePostComment}
            />
            <Pressable onPress={handlePostComment} style={styles.cmtPostBtn}>
              <LinearGradient
                colors={[colors.ember, colors.emberSoft]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.cmtPostGradient}
              >
                <Text style={styles.cmtPostText}>Post</Text>
              </LinearGradient>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  top: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 8,
  },
  backBtn: {
    alignSelf: 'flex-start',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: 999,
  },
  backText: {
    color: colors.text,
    fontSize: 14,
    fontFamily: fonts.bodySemiBold,
  },
  body: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  photo: {
    aspectRatio: 4 / 5,
    borderRadius: 22,
    overflow: 'hidden',
    marginBottom: 14,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 13,
  },
  who: {
    flex: 1,
  },
  whoName: {
    fontSize: 16,
    fontFamily: fonts.bodyBold,
    color: colors.text,
  },
  whoLoc: {
    fontSize: 12.5,
    color: colors.muted,
    fontFamily: fonts.bodyRegular,
    marginTop: 2,
  },
  caption: {
    fontSize: 14.5,
    lineHeight: 21,
    color: colors.text,
    fontFamily: fonts.bodyRegular,
    marginBottom: 18,
  },
  captionUser: {
    fontFamily: fonts.bodySemiBold,
  },
  reactRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 22,
  },
  reactBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 13,
    borderRadius: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
  },
  reactBtnOn: {
    backgroundColor: 'rgba(255,122,54,0.1)',
    borderColor: 'rgba(255,122,54,0.4)',
  },
  reactIcon: {
    fontSize: 18,
    color: colors.muted,
  },
  reactIconOn: {
    color: colors.ember,
  },
  reactLabel: {
    fontSize: 14,
    fontFamily: fonts.bodySemiBold,
    color: colors.muted,
  },
  reactLabelOn: {
    color: colors.ember,
  },
  cmtLabel: {
    fontSize: 12,
    fontFamily: fonts.bodyBold,
    color: colors.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.7,
    marginBottom: 14,
  },
  cmt: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 14,
  },
  cmtText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: colors.text,
    fontFamily: fonts.bodyRegular,
  },
  cmtUser: {
    fontFamily: fonts.bodySemiBold,
  },
  cmtInputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 14,
    paddingLeft: 14,
    paddingRight: 6,
    marginTop: 18,
  },
  cmtInput: {
    flex: 1,
    color: colors.text,
    fontFamily: fonts.bodyRegular,
    fontSize: 14,
    paddingVertical: 13,
  },
  cmtPostBtn: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  cmtPostGradient: {
    paddingVertical: 9,
    paddingHorizontal: 14,
  },
  cmtPostText: {
    fontSize: 13,
    fontFamily: fonts.bodyBold,
    color: '#1a0f08',
  },
});
