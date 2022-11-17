/**
 * @file Declares LikeType enumeration representing a user's like type: like or dislike
 */

/**
 * Enum for a user's like type
 * @readonly
 * @enum {string}
 */
enum LikeType {
    Liked = 'LIKED',
    Disliked = 'DISLIKED',
};
export default LikeType;