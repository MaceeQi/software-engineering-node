/**
 * @file Implements DAO managing data storage of messages. Uses mongoose MessageModel
 * to integrate with MongoDB
 */
import MessageDaoI from "../interfaces/MessageDaoI";
import Message from "../models/Message";
import MessageModel from "../mongoose/MessageModel";

/**
 * @class MessageDao Implements Data Access Object managing data storage
 * of Messages
 * @property {MessageDao} messageDao Private single instance of MessageDao
 */
export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns MessageDao
     */
    public static getInstance = (): MessageDao => {
        if(MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }
    private constructor() {}

    /**
     * Inserts message instance into the database
     * @param {string} from Primary key of the user sending the message
     * @param {string} to Primary key of the user receiving the message
     * @param {Message} message Instance to be inserted into the database
     * @returns Promise To be notified when message is inserted into the database
     */
    userMessagesUser = async (from: string, to: string, message: Message): Promise<Message> =>
        MessageModel.create({...message, from, to});

    /**
     * Removes message from the database
     * @param {string} from Primary key of the user that sent the message
     * @param {string} to Primary key of the user that received the message
     * @returns Promise To be notified when message is removed from the database
     */
    userDeletesMessage = async (from: string, to: string): Promise<any> =>
        MessageModel.deleteOne({from, to});

    /**
     * Uses MessageModel to retrieve all message documents from messages collection
     * that were sent by a given user
     * @param {string} uid Primary key of the user that sent the messages
     * @returns Promise To be notified when the messages are retrieved from database
     */
    findAllMessagesSent = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({from: uid})
            .populate("message", "to")
            .exec();

    /**
     * Uses MessageModel to retrieve all message documents from messages collection
     * that were received by a given user
     * @param {string} uid Primary key of the user that received the messages
     * @returns Promise To be notified when the messages are retrieved from database
     */
    findAllMessagesReceived = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({to: uid})
            .populate("message", "from")
            .exec();

    /**
     * Uses MessageModel to retrieve all message documents from messages collection
     * that were sent to a given user
     * @param {string} uid Primary key of the user that received the messages
     * @returns Promise To be notified when the messages are retrieved from database
     */
    findUsersThatMessagedMe = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({to: uid})
            .populate("from")
            .exec();

    /**
     * Uses MessageModel to retrieve all message documents from messages collection
     * that were sent by a given user
     * @param {string} uid Primary key of the user that sent the messages
     * @returns Promise To be notified when the messages are retrieved from database
     */
    findUsersIHaveMessaged = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({from: uid})
            .populate("to")
            .exec();
}