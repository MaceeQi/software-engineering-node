import MessageDaoI from "../interfaces/MessageDaoI";
import Message from "../models/Message";
import MessageModel from "../mongoose/MessageModel";

export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;
    public static getInstance = (): MessageDao => {
        if(MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }
    private constructor() {}

    userMessagesUser = async (from: string, to: string, message: Message): Promise<Message> =>
        MessageModel.create({...message, from, to});

    userDeletesMessage = async (from: string, to: string): Promise<any> =>
        MessageModel.deleteOne({from, to});

    findAllMessagesSent = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({from: uid})
            .populate("message", "to")
            .exec();

    findAllMessagesReceived = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({to: uid})
            .populate("message", "from")
            .exec();

    findUsersThatMessagedMe = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({to: uid})
            .populate("from")
            .exec();

    findUsersIHaveMessaged = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({from: uid})
            .populate("to")
            .exec();
}