import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SceneArt } from './SceneArt';
import { Avatar } from './Avatar';
import { PhotoBadges } from './PhotoBadges';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';
import type { FeedPost } from '../data/feedData';

interface FeedCardProps {
  post: FeedPost;
  onOpenSession?: (post: FeedPost) => void;
}

// Matches .card / .card-head / .photo / .card-foot / .cap in the prototype —
// one feed post: header (avatar, user, location, Pass button), the scene
// photo with strain/mood chips + star badge, the reaction bar, and caption.
export function FeedCard({ post, onOpenSession }: FeedCardProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [passed, setPassed] = useState(false);

  const toggleLike = () => {
    setLiked((prev) => {
      const next = !prev;
      setLikeCount((c) => (next ? c + 1 : c - 1));
      return next;
    });
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardHead}>
        <Avatar username={post.user} avatarIndex={post.avatarIndex} />
        <View style={styles.who}>
          <Text style={styles.username}>{post.user}</Text>
          <Text style={styles.location}>📍 {post.location}</Text>
        </View>
        <Pressable
          onPress={() => setPassed((p) => !p)}
          style={[styles.passBtn, passed && styles.passBtnOn]}
        >
          <Text style={styles.passIcon}>💨</Text>
          <Text style={[styles.passText, passed && styles.passTextOn]}>
            {passed ? 'Passed' : 'Pass'}
          </Text>
        </Pressable>
      </View>

      <Pressable
        style={styles.photo}
        onPress={() => onOpenSession?.(post)}
      >
        <SceneArt scene={post.scene} gradientId={`feed-${post.id}`} />
        <PhotoBadges strain={post.strain} mood={post.mood} rating={post.rating} />
      </Pressable>

      <View style={styles.cardFoot}>
        <Pressable onPress={toggleLike} style={styles.reactHeart}>
          <Text style={[styles.heartIcon, liked && styles.heartIconOn]}>
            {liked ? '♥' : '♡'}
          </Text>
          <Text style={[styles.reactCount, liked && styles.reactCountOn]}>
            {likeCount}
          </Text>
        </Pressable>
        <View style={styles.shareSlot}>
          <Feather name="share" size={16} color={colors.muted} />
        </View>
      </View>

      <Text style={styles.caption}>
        <Text style={styles.captionUser}>{post.user} </Text>
        {post.caption}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 14,
    marginBottom: 22,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 24,
    overflow: 'hidden',
  },
  cardHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
    padding: 13,
  },
  who: {
    flex: 1,
  },
  username: {
    fontSize: 14,
    fontFamily: fonts.bodySemiBold,
    color: colors.text,
  },
  location: {
    fontSize: 12,
    color: colors.muted,
    fontFamily: fonts.bodyRegular,
    marginTop: 2,
  },
  passBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.surface2,
    borderWidth: 1,
    borderColor: colors.line,
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 999,
  },
  passBtnOn: {
    backgroundColor: 'rgba(255,122,54,0.16)',
    borderColor: colors.ember,
  },
  passIcon: {
    fontSize: 14,
  },
  passText: {
    fontSize: 13,
    fontFamily: fonts.bodySemiBold,
    color: colors.text,
  },
  passTextOn: {
    color: colors.gold,
  },
  photo: {
    aspectRatio: 4 / 5,
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  cardFoot: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    padding: 13,
    paddingHorizontal: 16,
  },
  reactHeart: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  heartIcon: {
    fontSize: 17,
    color: colors.muted,
  },
  heartIconOn: {
    color: colors.ember,
  },
  reactCount: {
    fontSize: 13,
    fontFamily: fonts.bodySemiBold,
    color: colors.muted,
  },
  reactCountOn: {
    color: colors.ember,
  },
  shareSlot: {
    marginLeft: 'auto',
  },
  caption: {
    paddingHorizontal: 16,
    paddingBottom: 14,
    fontSize: 13,
    color: colors.text,
    lineHeight: 19,
    fontFamily: fonts.bodyRegular,
  },
  captionUser: {
    fontFamily: fonts.bodySemiBold,
  },
});
