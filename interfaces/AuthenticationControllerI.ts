export default interface AuthenticationControllerI {
    signup (req: Request, res: Response): void;
    profile (req: Request, res: Response): void;
    logout (req: Request, res: Response): void;
    login (req: Request, res: Response): void;
}