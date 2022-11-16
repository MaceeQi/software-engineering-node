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
/**
 * @class LikeController Implements RESTful Web service API for likes resource
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/likes to retrieve all the tuits liked by a user
 *     </li>
 *     <li>GET /api/tuits/:tid/likes to retrieve all users that liked a tuit
 *     </li>
 *     <li>POST /api/users/:uid/likes/:tid to record that a user likes a tuit
 *     </li>
 *     <li>DELETE /api/users/:uid/unlikes/:tid to record that a user
 *     no longer likes a tuit</li>
 *     <li>PUT /api/users/:uid/likes/:tid to update the likes count</li>
 * </ul>
 * @property {LikeDao} likeDao Singleton DAO implementing likes CRUD operations
 * @property {LikeController} likeController Singleton controller implementing
 * RESTful Web service API
 * @property {TuitController} tuitController TuitController instance that aids in
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
        this.findAllTuitsLikedByUser = (req, res) => LikeController.likeDao.findAllTuitsLikedByUser(req.params.uid)
            .then(likes => res.json(likes));
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
                console.log("here1");
                // Count how many like this tuit
                const howManyLikedTuit = yield LikeController.likeDao.countHowManyLikedTuit(tid);
                console.log("here2");
                // Get tuit to get current stats
                const tuitDao = LikeController.tuitController.getTuitDao();
                console.log("Here2.5");
                let tuit = yield tuitDao.findTuitById(tid);
                console.log("here3");
                // Already liked: unlike + decrement likes count
                if (userAlreadyLikedTuit) {
                    yield LikeController.likeDao.userUnlikesTuit(userId, tid);
                    tuit.stats.likes = howManyLikedTuit - 1;
                }
                // Not yet liked: like + increment likes count
                else {
                    yield LikeController.likeDao.userLikesTuit(userId, tid);
                    tuit.stats.likes = howManyLikedTuit + 1;
                }
                console.log("here4");
                // Update likes count
                yield tuitDao.updateLikes(tid, tuit.stats);
                console.log("here5");
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
LikeController.tuitController = null;
/**
 * Creates singleton controller instance
 * @param {Express} app Express instance to declare the RESTful Web service
 * API
 * @param {TuitController} tuitController TuitController instance to aid in RESTful
 * Web service API for likes
 * @return LikeController
 */
LikeController.getInstance = (app, tuitController) => {
    if (LikeController.likeController === null) {
        LikeController.likeController = new LikeController();
        LikeController.tuitController = tuitController;
        app.get("/api/users/:uid/likes", LikeController.likeController.findAllTuitsLikedByUser);
        app.get("/api/tuits/:tid/likes", LikeController.likeController.findAllUsersThatLikedTuit);
        app.post("/api/users/:uid/likes/:tid", LikeController.likeController.userLikesTuit);
        app.delete("/api/users/:uid/unlikes/:tid", LikeController.likeController.userUnlikesTuit);
        app.put("/api/users/:uid/likes/:tid", LikeController.likeController.userTogglesTuitLikes);
    }
    return LikeController.likeController;
};
;
//# sourceMappingURL=LikeController.js.map