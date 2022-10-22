import Follow from "../models/Follow";

/**
 * @file Declares API for Follows related data access object methods
 */
export default interface FollowDaoI {
    userFollowsUser (follower: string, following: string): Promise<Follow>;
    userUnfollowsUser (follower: string, following: string): Promise<any>;
    findWhoIsFollowingMe (me: string): Promise<Follow[]>;
    findWhoIAmFollowing (me: string): Promise<Follow[]>;
    findUserIAmFollowing (me: string, user: string): Promise<any>;
    findUserFollowingMe (user: string, me: string): Promise<any>;
};