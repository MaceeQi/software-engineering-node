import MessageControllerI from "../interfaces/MessageControllerI";
import MessageDao from "../daos/MessageDao";
import {Express, Request, Response} from "express";

export default class MessageController implements MessageControllerI {
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;
    public static getInstance = (app: Express): MessageController => {
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
    }
    private constructor() {}

    userMessagesUser = async (req: Request, res: Response) => {
        const from = req.params.from;
        const to = req.params.to;
        const message = req.body;
        const newMessage = await MessageController.messageDao.userMessagesUser(from, to, message);
        res.json(newMessage);
    }

    userDeletesMessage = async (req: Request, res: Response) => {
        const from = req.params.from;
        const to = req.params.to;
        const status = await MessageController.messageDao.userDeletesMessage(from, to);
        res.json(status);
    }

    findAllMessagesSent = async (req: Request, res: Response) => {
        const uid = req.params.uid;
        const messages = await MessageController.messageDao.findAllMessagesSent(uid);
        res.json(messages);
    }

    findAllMessagesReceived = async (req: Request, res: Response) => {
        const uid = req.params.uid;
        const messages = await MessageController.messageDao.findAllMessagesReceived(uid);
        res.json(messages);
    }

    findUsersThatMessagedMe = async (req: Request, res: Response) => {
        const uid = req.params.uid;
        const users = await MessageController.messageDao.findUsersThatMessagedMe(uid);
        res.json(users);
    }

    findUsersIHaveMessaged = async (req: Request, res: Response) => {
        const uid = req.params.uid;
        const users = await MessageController.messageDao.findUsersIHaveMessaged(uid);
        res.json(users);
    }
}