"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TuitDao_1 = __importDefault(require("../daos/TuitDao"));
/**
 * @class TuitController Implements RESTful Web service API for tuits resource
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/tuits to retrieve all the tuit instances</li>
 *     <li>GET /api/tuits/:tid to retrieve a particular tuit instance</li>
 *     <li>GET /api/users/:uid/tuits to retrieve tuits for a given user </li>
 *     <li>POST /api/users/:uid/tuits to create a new tuit instance</li>
 *     <li>DELETE /api/tuits/:tid to remove a particular tuit instance</li>
 *     <li>PUT /api/tuits/:tid to modify an individual tuit instance </li>
 * </ul>
 * @property {TuitDao} tuitDao Singleton DAO implementing tuit CRUD operations
 * @property {TuitController} tuitController Singleton controller implementing
 * RESTful Web service API
 */
class TuitController {
    constructor() {
        /**
         * Retrieves all tuits from the database and returns an array of tuits
         * @param {Request} req Represents request from client
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the tuit objects
         */
        this.findAllTuits = (req, res) => TuitController.tuitDao.findAllTuits().then(tuits => res.json(tuits));
        /**
         * Retrieves the tuit by their primary key
         * @param {Request} req Represents request from client, including path
         * parameter tid identifying the primary key of the tuit to be retrieved
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON containing the tuit that matches the tuit ID
         */
        this.findTuitById = (req, res) => TuitController.tuitDao.findTuitById(req.params.tid).then(tuit => res.json(tuit));
        /**
         * Retrieves all tuits from the database for a particular user and returns
         * an array of tuits
         * @param {Request} req Represents request from client, including path
         * parameter uid identifying the primary key of the user to retrieve
         * all their tuits
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the tuit objects
         */
        this.findTuitsByUser = (req, res) => {
            // if user id is "me" and there's a user logged in: get user id from logged in user
            // otherwise use parameter
            let userId = req.params.uid === "me"
                && req.session['profile'] ? req.session['profile']._id : req.params.uid;
            TuitController.tuitDao.findTuitsByUser(userId).then(tuits => res.json(tuits));
        };
        /**
         * Creates a new tuit instance
         * @param {Request} req Represents request from client, including path
         * parameter uid identifying the primary key of the user that created
         * the tuit and body containing the JSON object for the new tuit to be
         * inserted in the database
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON containing the new tuit that was inserted in the
         * database
         */
        this.createTuit = (req, res) => {
            // if user id is "me" and there's a logged in user: get user id from logged in user
            // otherwise use parameter
            let userId = req.params.uid === "me"
                && req.session['profile'] ? req.session['profile']._id : req.params.uid;
            TuitController.tuitDao.createTuit(userId, req.body).then(actualTuit => res.json(actualTuit));
        };
        /**
         * Removes a tuit instance from the database
         * @param {Request} req Represents request from client, including path
         * parameter tid identifying the primary key of the tuit to be removed
         * @param {Response} res Represents response to client, including status
         * on whether deleting a tuit was successful or not
         */
        this.deleteTuit = (req, res) => TuitController.tuitDao.deleteTuit(req.params.tid).then(status => res.json(status));
        /**
         * Modifies an existing tuit instance
         * @param {Request} req Represents request from client, including path
         * parameter tid identifying the primary key of the tuit to be modified
         * and body containing the JSON object for the tuit to be updated in the
         * database
         * @param {Response} res Represents response to client, including status
         * on whether updating a tuit was successful or not
         */
        this.updateTuit = (req, res) => TuitController.tuitDao.updateTuit(req.params.tid, req.body).then(status => res.json(status));
    }
}
exports.default = TuitController;
TuitController.tuitController = null;
TuitController.tuitDao = TuitDao_1.default.getInstance();
/**
 * Creates singleton controller instance
 * @param {Express} app Express instance to declare the RESTful Web service
 * API
 * @return TuitController
 */
TuitController.getInstance = (app) => {
    if (TuitController.tuitController === null) {
        TuitController.tuitController = new TuitController();
        app.get('/api/tuits', TuitController.tuitController.findAllTuits);
        app.get('/api/tuits/:tid', TuitController.tuitController.findTuitById);
        app.get('/api/users/:uid/tuits', TuitController.tuitController.findTuitsByUser);
        app.post('/api/users/:uid/tuits', TuitController.tuitController.createTuit);
        app.delete('/api/tuits/:tid', TuitController.tuitController.deleteTuit);
        app.put('/api/tuits/:tid', TuitController.tuitController.updateTuit);
    }
    return TuitController.tuitController;
};
//# sourceMappingURL=TuitController.js.map