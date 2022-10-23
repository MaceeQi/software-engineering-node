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
const MessageDao_1 = __importDefault(require("../daos/MessageDao"));
/**
 * @class MessageController Implements RESTful Web service API for messages resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:from/messages/:to to create a new message instance</li>
 *     <li>DELETE /api/users/:from/messages/:to to remove a particular message instance</li>
 *     <li>GET /api/users/:uid/sender/messages to retrieve messages sent by a given user</li>
 *     <li>GET /api/users/:uid/receiver/messages to retrieve messages received by a given user</li>
 *     <li>GET /api/users/:uid/messages/senders to retrieve users a particular user has received
 *     messages from</li>
 *     <li>GET /api/users/:uid/messages/receivers to retrieve users a particular user has sent
 *     messages to</li>
 * </ul>
 * @property {MessageDao} messageDao Singleton DAO implementing message CRUD operations
 * @property {MessageController} messageController Singleton controller implementing
 * RESTful Web service API
 */
class MessageController {
    constructor() {
        /**
         * Creates a new message instance
         * @param {Request} req Represents request from client, including the
         * path parameters from and to representing the user sending the message
         * and the user receiving the message. Also includes the body containing
         * the JSON object for the new message to be inserted in the database
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON containing the new message that was inserted in the
         * database
         */
        this.userMessagesUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const from = req.params.from;
            const to = req.params.to;
            const message = req.body;
            const newMessage = yield MessageController.messageDao.userMessagesUser(from, to, message);
            res.json(newMessage);
        });
        /**
         * Removes a message instance from the database
         * @param {Request} req Represents request from client, including path
         * parameter from and to representing the user sending the message
         * and the user receiving the message.
         * @param {Response} res Represents response to client, including status
         * on whether deleting a message was successful or not
         */
        this.userDeletesMessage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const from = req.params.from;
            const to = req.params.to;
            const status = yield MessageController.messageDao.userDeletesMessage(from, to);
            res.json(status);
        });
        /**
         * Retrieves all messages sent by a particular user from the database and
         * returns an array of messages
         * @param {Request} req Represents request from client, including path
         * parameter uid identifying the primary key of the particular user to retrieve
         * all messages sent from user
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the message objects
         */
        this.findAllMessagesSent = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const uid = req.params.uid;
            const messages = yield MessageController.messageDao.findAllMessagesSent(uid);
            res.json(messages);
        });
        /**
         * Retrieves all messages received by a particular user from the database and
         * returns an array of messages
         * @param {Request} req Represents request from client, including path
         * parameter uid identifying the primary key of the particular user to retrieve
         * all messages received by user
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the message objects
         */
        this.findAllMessagesReceived = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const uid = req.params.uid;
            const messages = yield MessageController.messageDao.findAllMessagesReceived(uid);
            res.json(messages);
        });
        /**
         * Retrieves all users that sent a message to a particular user from the database
         * and returns an array of users
         * @param {Request} req Represents request from client, including path
         * parameter uid identifying the primary key of the user that received the messages
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the user objects
         */
        this.findUsersThatMessagedMe = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const uid = req.params.uid;
            const users = yield MessageController.messageDao.findUsersThatMessagedMe(uid);
            res.json(users);
        });
        /**
         * Retrieves all users that received a message from a particular user from the database
         * and returns an array of users
         * @param {Request} req Represents request from client, including path
         * parameter uid identifying the primary key of the user that sent the messages
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the user objects
         */
        this.findUsersIHaveMessaged = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const uid = req.params.uid;
            const users = yield MessageController.messageDao.findUsersIHaveMessaged(uid);
            res.json(users);
        });
    }
}
exports.default = MessageController;
MessageController.messageDao = MessageDao_1.default.getInstance();
MessageController.messageController = null;
/**
 * Creates singleton controller instance
 * @param {Express} app Express instance to declare the RESTful Web service
 * API
 * @return MessageController
 */
MessageController.getInstance = (app) => {
    if (MessageController.messageController === null) {
        MessageController.messageController = new MessageController();
        app.post("/api/users/:from/messages/:to", MessageController.messageController.userMessagesUser);
        app.delete("/api/users/:from/messages/:to", MessageController.messageController.userDeletesMessage);
        app.get("/api/users/:uid/sender/messages", MessageController.messageController.findAllMessagesSent);
        app.get("/api/users/:uid/receiver/messages", MessageController.messageController.findAllMessagesReceived);
        app.get("/api/users/:uid/messages/senders", MessageController.messageController.findUsersThatMessagedMe);
        app.get("/api/users/:uid/messages/receivers", MessageController.messageController.findUsersIHaveMessaged);
    }
    return MessageController.messageController;
};
//# sourceMappingURL=MessageController.js.map