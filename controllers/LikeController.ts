/**
 * @file Controller RESTful Web service API for likes resource
 */
import LikeControllerI from "../interfaces/LikeControllerI";
import LikeDao from "../daos/LikeDao";
import {Express, Request, Response} from "express";
import TuitDao from "../daos/TuitDao";

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
 * @property {TuitDao} tuitDao TuitDao instance that aids in
 * implementing RESTful Web service API for likes
 */
export default class LikeController implements LikeControllerI {
    private static likeDao: LikeDao = LikeDao.getInstance();
    private static likeController: LikeController | null = null;
    private static tuitDao: TuitDao = TuitDao.getInstance();

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return LikeController
     */
    public static getInstance = (app: Express): LikeController => {
        if(LikeController.likeController === null) {
            LikeController.likeController = new LikeController();
            app.get("/api/users/:uid/likes", LikeController.likeController.findAllTuitsLikedByUser);
            app.get("/api/tuits/:tid/likes", LikeController.likeController.findAllUsersThatLikedTuit);
            app.post("/api/users/:uid/likes/:tid", LikeController.likeController.userLikesTuit);
            app.delete("/api/users/:uid/unlikes/:tid", LikeController.likeController.userUnlikesTuit);
            app.put("/api/users/:uid/likes/:tid", LikeController.likeController.userTogglesTuitLikes);
        }
        return LikeController.likeController;
    }
    private constructor() {}

    /**
     * Retrieves all users that liked a tuit from the database
     * @param {Request} req Represents request from client, including the path
     * parameter tid representing the liked tuit
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findAllUsersThatLikedTuit = (req: Request, res: Response) =>
        LikeController.likeDao.findAllUsersThatLikedTuit(req.params.tid)
            .then(likes => res.json(likes));

    /**
     * Retrieves all tuits liked by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user that liked the tuits
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects that were liked
     */
    findAllTuitsLikedByUser = (req: Request, res: Response) =>
        LikeController.likeDao.findAllTuitsLikedByUser(req.params.uid)
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
    userLikesTuit = (req: Request, res: Response) =>
        LikeController.likeDao.userLikesTuit(req.params.uid, req.params.tid)
            .then(likes => res.json(likes));

    /**
     * Removes a like instance from the database
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is unliking
     * the tuit and the tuit being unliked
     * @param {Response} res Represents response to client, including status
     * on whether deleting the like was successful or not
     */
    userUnlikesTuit = (req: Request, res: Response) =>
        LikeController.likeDao.userUnlikesTuit(req.params.uid, req.params.tid)
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
    userTogglesTuitLikes = async (req, res) => {
        const uid = req.params.uid;
        const tid = req.params.tid;
        const profile = req.session['profile'];

        // If logged in, get ID from profile; Otherwise, use parameter
        const userId = uid === "me" && profile ? profile._id : uid;

        try {
            // Check if user already liked tuit
            const userAlreadyLikedTuit = await LikeController.likeDao.findUserLikesTuit(userId, tid);
            // Check if user already disliked tuit
            const userAlreadyDislikedTuit = await LikeController.likeDao.findUserDislikesTuit(userId, tid);
            // Count how many like this tuit
            const howManyLikedTuit = await LikeController.likeDao.countHowManyLikedTuit(tid);

            // Get tuit to get current stats
            let tuit = await LikeController.tuitDao.findTuitById(tid);

            // Already liked: unlike + decrement likes count
            if (userAlreadyLikedTuit) {
                await LikeController.likeDao.userUnlikesTuit(userId, tid);
                tuit.stats.likes = howManyLikedTuit - 1;
            }
            // Already disliked: change dislike to like, decrement dislikes count, increment likes count
            else if (userAlreadyDislikedTuit) {
                await LikeController.likeDao.updateLike(userId, tid, "LIKED");
                const howManyDislikedTuit = await LikeController.likeDao.countHowManyDislikedTuit(tid);
                tuit.stats.likes = howManyLikedTuit + 1;
                tuit.stats.dislikes = howManyDislikedTuit - 1;
            }
            // Not yet liked: like + increment likes count
            else {
                await LikeController.likeDao.userLikesTuit(userId, tid);
                tuit.stats.likes = howManyLikedTuit + 1;
            }

            // Update likes count
            await LikeController.tuitDao.updateLikes(tid, tuit.stats);
            res.sendStatus(200);
        } catch (e) {
            // Respond with failure if there's an error
            res.sendStatus(404);
        }
    }
};