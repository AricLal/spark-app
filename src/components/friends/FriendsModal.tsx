import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { FriendRow } from './FriendRow';
import { useFriends } from '../../context/FriendsContext';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/typography';

// Matches .modal/.modal-card — a bottom-sheet modal (not full screen,
// anchored to the bottom with a dimmed/blurred backdrop you can tap to
// dismiss). Rendered globally (sibling to the navigator, like the session
// detail overlay) since it's triggered from the Feed header's icon button
// but conceptually isn't tied to any one screen.
//
// The username search field is left decorative, same as the prototype —
// there's no oninput handler or result list wired to it there either, and
// unlike the strain field there's no catalog to fabricate matches against.
export function FriendsModal() {
  const {
    isOpen,
    closeFriends,
    incoming,
    suggested,
    pendingCount,
    acceptRequest,
    declineRequest,
    sendRequest,
  } = useFriends();

  const translateY = useRef(new Animated.Value(40)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isOpen) {
      translateY.setValue(40);
      backdropOpacity.setValue(0);
      Animated.timing(translateY, {
        toValue: 0,
        duration: 320,
        useNativeDriver: true,
      }).start();
      Animated.timing(backdropOpacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [isOpen, translateY, backdropOpacity]);

  if (!isOpen) return null;

  return (
    <View style={styles.root}>
      <Pressable style={StyleSheet.absoluteFillObject} onPress={closeFriends}>
        <Animated.View style={[StyleSheet.absoluteFillObject, { opacity: backdropOpacity }]}>
          <BlurView intensity={20} tint="dark" style={styles.backdropBlur} />
        </Animated.View>
      </Pressable>

      <Animated.View style={[styles.card, { transform: [{ translateY }] }]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.head}>
            <Text style={styles.headTitle}>Friends</Text>
            <Pressable onPress={closeFriends} style={styles.closeBtn}>
              <Text style={styles.closeText}>✕</Text>
            </Pressable>
          </View>

          <View style={styles.searchWrap}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              placeholder="Add by username…"
              placeholderTextColor={colors.dim}
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.searchInput}
            />
          </View>

          <View style={styles.note}>
            <Text style={styles.noteText}>
              You'll both need to accept before you can see each other's sessions.
            </Text>
          </View>

          <View style={styles.reqHead}>
            <Text style={styles.reqHeadText}>Requests for you</Text>
            {pendingCount > 0 && (
              <View style={styles.reqCt}>
                <Text style={styles.reqCtText}>{pendingCount}</Text>
              </View>
            )}
          </View>
          {incoming.map((r) => (
            <FriendRow key={r.id} user={r.user} avatarIndex={r.avatarIndex} subtitle={r.subtitle}>
              {r.status === 'pending' && (
                <View style={styles.reqActs}>
                  <Pressable onPress={() => acceptRequest(r.id)} style={styles.reqYes}>
                    <Text style={styles.reqYesText}>Accept</Text>
                  </Pressable>
                  <Pressable onPress={() => declineRequest(r.id)} style={styles.reqNo}>
                    <Text style={styles.reqNoText}>Decline</Text>
                  </Pressable>
                </View>
              )}
              {r.status === 'accepted' && (
                <Text style={styles.reqDoneFriends}>✓ Friends</Text>
              )}
              {r.status === 'declined' && <Text style={styles.reqDone}>Declined</Text>}
            </FriendRow>
          ))}

          <Text style={[styles.reqHeadText, styles.secondHead]}>People you may know</Text>
          {suggested.map((s) => (
            <FriendRow key={s.id} user={s.user} avatarIndex={s.avatarIndex} subtitle={s.subtitle}>
              <Pressable
                onPress={() => sendRequest(s.id)}
                disabled={s.status === 'sent'}
                style={[styles.frAdd, s.status === 'sent' && styles.frAddSent]}
              >
                <Text style={[styles.frAddText, s.status === 'sent' && styles.frAddTextSent]}>
                  {s.status === 'sent' ? 'Requested' : 'Add'}
                </Text>
              </Pressable>
            </FriendRow>
          ))}
        </ScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 90,
    justifyContent: 'flex-end',
  },
  backdropBlur: {
    flex: 1,
    backgroundColor: 'rgba(10,7,6,0.6)',
  },
  card: {
    maxHeight: '88%',
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.line,
    borderBottomWidth: 0,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 26,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headTitle: {
    fontFamily: fonts.displayBold,
    fontSize: 21,
    color: colors.text,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    fontSize: 13,
    color: colors.muted,
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 14,
    paddingHorizontal: 13,
    marginBottom: 6,
  },
  searchIcon: {
    fontSize: 15,
    opacity: 0.8,
  },
  searchInput: {
    flex: 1,
    color: colors.text,
    fontFamily: fonts.bodyMedium,
    fontSize: 15,
    paddingVertical: 13,
  },
  note: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 10,
    padding: 12,
    marginBottom: 18,
  },
  noteText: {
    fontSize: 12,
    color: colors.dim,
    fontFamily: fonts.bodyRegular,
    lineHeight: 17,
  },
  reqHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  secondHead: {
    marginTop: 20,
    marginBottom: 12,
  },
  reqHeadText: {
    fontSize: 12,
    fontFamily: fonts.bodyBold,
    color: colors.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.7,
  },
  reqCt: {
    backgroundColor: colors.surface2,
    paddingVertical: 1,
    paddingHorizontal: 8,
    borderRadius: 999,
  },
  reqCtText: {
    fontSize: 11,
    color: colors.gold,
    fontFamily: fonts.bodySemiBold,
  },
  reqActs: {
    flexDirection: 'row',
    gap: 7,
    flexShrink: 0,
  },
  reqYes: {
    backgroundColor: colors.ember,
    paddingVertical: 8,
    paddingHorizontal: 13,
    borderRadius: 999,
  },
  reqYesText: {
    fontSize: 12,
    fontFamily: fonts.bodyBold,
    color: '#1a0f08',
  },
  reqNo: {
    backgroundColor: colors.surface2,
    borderWidth: 1,
    borderColor: colors.line,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
  },
  reqNoText: {
    fontSize: 12,
    fontFamily: fonts.bodySemiBold,
    color: colors.muted,
  },
  reqDone: {
    fontSize: 12,
    fontFamily: fonts.bodyBold,
    color: colors.muted,
  },
  reqDoneFriends: {
    fontSize: 12,
    fontFamily: fonts.bodyBold,
    color: colors.gold,
  },
  frAdd: {
    backgroundColor: colors.ember,
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: 999,
    flexShrink: 0,
  },
  frAddSent: {
    backgroundColor: colors.surface2,
    borderWidth: 1,
    borderColor: colors.line,
  },
  frAddText: {
    fontSize: 12,
    fontFamily: fonts.bodyBold,
    color: '#1a0f08',
  },
  frAddTextSent: {
    color: colors.muted,
  },
});
