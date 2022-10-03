/**
 * @file Implements an Express Node HTTP server.
 */
import express, {Request, Response} from 'express';
import * as mongoose from "mongoose";
import UserDao from "./daos/UserDao";
import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";
var cors = require('cors');
const app = express();  // express is a library  that allows you to create HTTP servers
app.use(cors());        // cors is tech that allows you to have people outside your domain to connect safely to your server
app.use(express.json());        // configuring our server so that it can parse json; json = format that data will be formatted as
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4
}
mongoose.connect('mongodb://localhost:27017/tuiter', options);   // connect to mongo - tuiter database

const userDao = new UserDao();
const userController = new UserController(app, userDao);
const tuitController = TuitController.getInstance(app);


function sayHello(req: Request, res: Response) {
    res.send('Welcome to Foundation of Software Engineering!');
}

// Where we configure server to listen to incoming requests / messages
// HTTP Methods: get, post, put, delete
app.get('/', sayHello);    // get function takes 2 args (string, function); string = pattern of url

app.get('/hello', (req: Request, res: Response) =>
    res.send('Welcome to Foundation of Software Engineering!'));

/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);
