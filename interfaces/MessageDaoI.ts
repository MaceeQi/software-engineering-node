import Message from "../models/Message";

/**
 * @file Declares API for Messages related data access object methods
 */
export default interface MessageDaoI {
    userMessagesUser (from: string, to: string, message: Message): Promise<Message>;
    userDeletesMessage (from: string, to: string): Promise<any>;
    findAllMessagesSent (uid: string): Promise<Message[]>;
    findAllMessagesReceived (uid: string): Promise<Message[]>;
    findUsersThatMessagedMe (uid: string): Promise<Message[]>;
    findUsersIHaveMessaged (uid: string): Promise<Message[]>;
}