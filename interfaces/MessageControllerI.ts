import {Request, Response} from "express";

export default interface MessageControllerI {
    userMessagesUser (req: Request, res: Response): void;
    userDeletesMessage (req: Request, res: Response): void;
    findAllMessagesSent (req: Request, res: Response): void;
    findAllMessagesReceived (req: Request, res: Response): void;
    findUsersThatMessagedMe (req: Request, res: Response): void;
    findUsersIHaveMessaged (req: Request, res: Response): void;
}