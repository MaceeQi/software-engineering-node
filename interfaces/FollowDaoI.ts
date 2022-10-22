import Follow from "../models/Follow";

export default interface FollowDaoI {
    userFollowsUser (follower: string, following: string): Promise<Follow>;
    userUnfollowsUser (follower: string, following: string): Promise<any>;
    findWhoIsFollowingMe (me: string): Promise<Follow[]>;
    findWhoIAmFollowing (me: string): Promise<Follow[]>;
    findUserIAmFollowing (me: string, user: string): Promise<any>;
    findUserFollowingMe (user: string, me: string): Promise<any>;
};