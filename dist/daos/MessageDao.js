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
const MessageModel_1 = __importDefault(require("../mongoose/MessageModel"));
/**
 * @class MessageDao Implements Data Access Object managing data storage
 * of Messages
 * @property {MessageDao} messageDao Private single instance of MessageDao
 */
class MessageDao {
    constructor() {
        /**
         * Inserts message instance into the database
         * @param {string} from Primary key of the user sending the message
         * @param {string} to Primary key of the user receiving the message
         * @param {Message} message Instance to be inserted into the database
         * @returns Promise To be notified when message is inserted into the database
         */
        this.userMessagesUser = (from, to, message) => __awaiter(this, void 0, void 0, function* () { return MessageModel_1.default.create(Object.assign(Object.assign({}, message), { from, to })); });
        /**
         * Removes message from the database
         * @param {string} from Primary key of the user that sent the message
         * @param {string} to Primary key of the user that received the message
         * @returns Promise To be notified when message is removed from the database
         */
        this.userDeletesMessage = (from, to) => __awaiter(this, void 0, void 0, function* () { return MessageModel_1.default.deleteOne({ from, to }); });
        /**
         * Uses MessageModel to retrieve all message documents from messages collection
         * that were sent by a given user
         * @param {string} uid Primary key of the user that sent the messages
         * @returns Promise To be notified when the messages are retrieved from database
         */
        this.findAllMessagesSent = (uid) => __awaiter(this, void 0, void 0, function* () {
            return MessageModel_1.default
                .find({ from: uid })
                .populate("message", "to")
                .exec();
        });
        /**
         * Uses MessageModel to retrieve all message documents from messages collection
         * that were received by a given user
         * @param {string} uid Primary key of the user that received the messages
         * @returns Promise To be notified when the messages are retrieved from database
         */
        this.findAllMessagesReceived = (uid) => __awaiter(this, void 0, void 0, function* () {
            return MessageModel_1.default
                .find({ to: uid })
                .populate("message", "from")
                .exec();
        });
        /**
         * Uses MessageModel to retrieve all message documents from messages collection
         * that were sent to a given user
         * @param {string} uid Primary key of the user that received the messages
         * @returns Promise To be notified when the messages are retrieved from database
         */
        this.findUsersThatMessagedMe = (uid) => __awaiter(this, void 0, void 0, function* () {
            return MessageModel_1.default
                .find({ to: uid })
                .populate("from")
                .exec();
        });
        /**
         * Uses MessageModel to retrieve all message documents from messages collection
         * that were sent by a given user
         * @param {string} uid Primary key of the user that sent the messages
         * @returns Promise To be notified when the messages are retrieved from database
         */
        this.findUsersIHaveMessaged = (uid) => __awaiter(this, void 0, void 0, function* () {
            return MessageModel_1.default
                .find({ from: uid })
                .populate("to")
                .exec();
        });
    }
}
exports.default = MessageDao;
MessageDao.messageDao = null;
/**
 * Creates singleton DAO instance
 * @returns MessageDao
 */
MessageDao.getInstance = () => {
    if (MessageDao.messageDao === null) {
        MessageDao.messageDao = new MessageDao();
    }
    return MessageDao.messageDao;
};
//# sourceMappingURL=MessageDao.js.map