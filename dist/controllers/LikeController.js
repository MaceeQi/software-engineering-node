"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LikeDao_1 = __importDefault(require("../daos/LikeDao"));
const TuitDao_1 = __importDefault(require("../daos/TuitDao"));
/**
 * @class LikeController Implements RESTful Web service API for likes resource
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/likes to retrieve all the tuits liked by a user
 *     </li>
 *     <li>GET /api/users/:uid/dislikes to retrieve all the tuits disliked by a user</li>
 *     <li>GET /api/tuits/:tid/likes to retrieve all users that liked a tuit
 *     </li>
 *     <li>POST /api/users/:uid/likes/:tid to record that a user likes a tuit
 *     </li>
 *     <li>DELETE /api/users/:uid/unlikes/:tid to record that a user
 *     no longer likes a tuit</li>
 *     <li>PUT /api/users/:uid/likes/:tid to update the likes count</li>
 *     <li>PUT /api/users/:uid/dislikes/:tid to update the dislikes count </li>
 * </ul>
 * @property {LikeDao} likeDao Singleton DAO implementing likes CRUD operations
 * @property {LikeController} likeController Singleton controller implementing
 * RESTful Web service API
 * @property {TuitDao} tuitDao TuitDao instance that aids in
 * implementing RESTful Web service API for likes
 */
class LikeController {
    constructor() {
        /**
         * Retrieves all users that liked a tuit from the database
         * @param {Request} req Represents request from client, including the path
         * parameter tid representing the liked tuit
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the user objects
         */
        this.findAllUsersThatLikedTuit = (req, res) => LikeController.likeDao.findAllUsersThatLikedTuit(req.params.tid)
            .then(likes => res.json(likes));
        /**
         * Retrieves all tuits liked by a user from the database
         * @param {Request} req Represents request from client, including the path
         * parameter uid representing the user that liked the tuits
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the tuit objects that were liked
         */
        this.findAllTuitsLikedByUser = (req, res) => {
            const uid = req.params.uid;
            const profile = req.session['profile'];
            const userId = uid === "me" && profile ? profile._id : uid;
            // Filter out likes with null tuits and extract tuit object from likes
            LikeController.likeDao.findAllTuitsLikedByUser(userId)
                .then(likes => {
                const likesNonNullTuits = likes.filter(like => like.tuit);
                const tuitsFromLikes = likesNonNullTuits.map(like => like.tuit);
                res.json(tuitsFromLikes);
            });
        };
        /**
         * Retrieves all tuits disliked by a user from the database
         * @param {Request} req Represents request from client, including the path
         * parameter uid representing the user that disliked the tuits
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the tuit objects that were disliked
         */
        this.findAllTuitsDislikedByUser = (req, res) => {
            const uid = req.params.uid;
            const profile = req.session['profile'];
            const userId = uid === "me" && profile ? profile._id : uid;
            // Filter out null tuits and extract tuit object
            LikeController.likeDao.findAllTuitsDislikedByUser(userId)
                .then(dislikes => {
                const dislikesNonNullTuits = dislikes.filter(dislike => dislike.tuit);
                const tuitsFromDislikes = dislikesNonNullTuits.map(dislike => dislike.tuit);
                res.json(tuitsFromDislikes);
            });
        };
        /**
         * Creates a new like instance
         * @param {Request} req Represents request from client, including the
         * path parameters uid and tid representing the user that is liking the tuit
         * and the tuit being liked
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON containing the new like that was inserted in the
         * database
         */
        this.userLikesTuit = (req, res) => LikeController.likeDao.userLikesTuit(req.params.uid, req.params.tid)
            .then(likes => res.json(likes));
        /**
         * Removes a like instance from the database
         * @param {Request} req Represents request from client, including the
         * path parameters uid and tid representing the user that is unliking
         * the tuit and the tuit being unliked
         * @param {Response} res Represents response to client, including status
         * on whether deleting the like was successful or not
         */
        this.userUnlikesTuit = (req, res) => LikeController.likeDao.userUnlikesTuit(req.params.uid, req.params.tid)
            .then(status => res.send(status));
        /**
         * Update likes count for tuit and insert or remove a like instance from the database
         * based on whether the user already has liked the tuit or not
         * @param {Request} req Represents request from client, including the path parameters
         * uid and tid representing the user that is liking or unliking the tuit and
         * the tuit being liked or unliked
         * @param {Response} res Represents response to client, including status on whether
         * updating the like was successful or not
         */
        this.userTogglesTuitLikes = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const uid = req.params.uid;
            const tid = req.params.tid;
            const profile = req.session['profile'];
            // If logged in, get ID from profile; Otherwise, use parameter
            const userId = uid === "me" && profile ? profile._id : uid;
            try {
                // Check if user already liked tuit
                const userAlreadyLikedTuit = yield LikeController.likeDao.findUserLikesTuit(userId, tid);
                // Check if user already disliked tuit
                const userAlreadyDislikedTuit = yield LikeController.likeDao.findUserDislikesTuit(userId, tid);
                // Count how many like this tuit
                const howManyLikedTuit = yield LikeController.likeDao.countHowManyLikedTuit(tid);
                // Get tuit to get current stats
                let tuit = yield LikeController.tuitDao.findTuitById(tid);
                // Already liked: unlike + decrement likes count
                if (userAlreadyLikedTuit) {
                    yield LikeController.likeDao.userUnlikesTuit(userId, tid);
                    tuit.stats.likes = howManyLikedTuit - 1;
                }
                // Already disliked: change dislike to like, decrement dislikes count, increment likes count
                else if (userAlreadyDislikedTuit) {
                    const howManyDislikedTuit = yield LikeController.likeDao.countHowManyDislikedTuit(tid);
                    yield LikeController.likeDao.updateLike(userId, tid, "LIKED");
                    tuit.stats.likes = howManyLikedTuit + 1;
                    tuit.stats.dislikes = howManyDislikedTuit - 1;
                }
                // Not yet liked or disliked: like + increment likes count
                else {
                    yield LikeController.likeDao.userLikesTuit(userId, tid);
                    tuit.stats.likes = howManyLikedTuit + 1;
                }
                // Update likes count
                yield LikeController.tuitDao.updateLikes(tid, tuit.stats);
                res.sendStatus(200);
            }
            catch (e) {
                // Respond with failure if there's an error
                res.sendStatus(404);
            }
        });
        /**
         * Update dislikes count for tuit and insert or remove a like instance from the database
         * based on whether the user already has disliked the tuit or not
         * @param {Request} req Represents request from client, including the path parameters
         * uid and tid representing the user that is disliking the tuit and
         * the tuit being disliked
         * @param {Response} res Represents response to client, including status on whether
         * updating the dislike was successful or not
         */
        this.userTogglesTuitDislikes = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const uid = req.params.uid;
            const tid = req.params.tid;
            const profile = req.session['profile'];
            // If logged in, get ID from profile; Otherwise, use parameter
            const userId = uid === "me" && profile ? profile._id : uid;
            try {
                // Check if user already liked tuit
                const userAlreadyLikedTuit = yield LikeController.likeDao.findUserLikesTuit(userId, tid);
                // Check if user already disliked tuit
                const userAlreadyDislikedTuit = yield LikeController.likeDao.findUserDislikesTuit(userId, tid);
                // Count how many dislike this tuit
                const howManyDislikedTuit = yield LikeController.likeDao.countHowManyDislikedTuit(tid);
                // Get tuit to get current stats
                let tuit = yield LikeController.tuitDao.findTuitById(tid);
                // Already liked: change like to dislike, decrement likes count, increment dislikes count
                if (userAlreadyLikedTuit) {
                    const howManyLikedTuit = yield LikeController.likeDao.countHowManyLikedTuit(tid);
                    yield LikeController.likeDao.updateLike(userId, tid, "DISLIKED");
                    tuit.stats.likes = howManyLikedTuit - 1;
                    tuit.stats.dislikes = howManyDislikedTuit + 1;
                }
                // Already disliked: remove dislike + decrement dislikes count
                else if (userAlreadyDislikedTuit) {
                    yield LikeController.likeDao.userUnlikesTuit(userId, tid);
                    tuit.stats.dislikes = howManyDislikedTuit - 1;
                }
                // Not yet disliked or liked: dislike + increment dislikes count
                else {
                    yield LikeController.likeDao.userDislikesTuit(userId, tid);
                    tuit.stats.dislikes = howManyDislikedTuit + 1;
                }
                // Update likes count
                yield LikeController.tuitDao.updateLikes(tid, tuit.stats);
                res.sendStatus(200);
            }
            catch (e) {
                // Respond with failure if there's an error
                res.sendStatus(404);
            }
        });
    }
}
exports.default = LikeController;
LikeController.likeDao = LikeDao_1.default.getInstance();
LikeController.likeController = null;
LikeController.tuitDao = TuitDao_1.default.getInstance();
/**
 * Creates singleton controller instance
 * @param {Express} app Express instance to declare the RESTful Web service
 * API
 * @return LikeController
 */
LikeController.getInstance = (app) => {
    if (LikeController.likeController === null) {
        LikeController.likeController = new LikeController();
        app.get("/api/users/:uid/likes", LikeController.likeController.findAllTuitsLikedByUser);
        app.get("/api/users/:uid/dislikes", LikeController.likeController.findAllTuitsDislikedByUser);
        app.get("/api/tuits/:tid/likes", LikeController.likeController.findAllUsersThatLikedTuit);
        app.post("/api/users/:uid/likes/:tid", LikeController.likeController.userLikesTuit);
        app.delete("/api/users/:uid/unlikes/:tid", LikeController.likeController.userUnlikesTuit);
        app.put("/api/users/:uid/likes/:tid", LikeController.likeController.userTogglesTuitLikes);
        app.put("/api/users/:uid/dislikes/:tid", LikeController.likeController.userTogglesTuitDislikes);
    }
    return LikeController.likeController;
};
;
//# sourceMappingURL=LikeController.js.map