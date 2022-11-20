/**
 * @file Implements an Express Node HTTP server. Declares RESTful Web services
 * enabling CRUD operations on the following resources:
 * <ul>
 *     <li>users</li>
 *     <li>tuits</li>
 *     <li>likes</li>
 *     <li>follows</li>
 *     <li>bookmarks</li>
 *     <li>messages</li>
 * </ul>
 *
 * Connects to a remote MongoDB instance hosted on the Atlas cloud database
 * service
 */
require("dotenv").config();
import express from 'express';
import {Request, Response} from "express";
import * as mongoose from "mongoose";
import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";
import LikeController from "./controllers/LikeController";
import FollowController from "./controllers/FollowController";
import BookmarkController from "./controllers/BookmarkController";
import MessageController from "./controllers/MessageController";
import AuthenticationController from "./controllers/AuthenticationController";

var cors = require('cors');
const session = require('express-session'); // express session establish identity and dialogs btwn users and servers exchanging stateless HTTP req/res
const app = express();  // express is a library  that allows you to create HTTP servers
const MongoStore = require('connect-mongo');
const corsOptions = {
    origin: ['https://a4--chipper-heliotrope-9263b8.netlify.app', 'http://localhost:3000'],
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));        // cors is tech that allows you to have people outside your domain to connect safely to your server
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

// build the connection string
const PROTOCOL = "mongodb+srv";
const DB_USERNAME = `${process.env.DB_USERNAME}`;
const DB_PASSWORD = `${process.env.DB_PASSWORD}`;
const HOST = "cluster0.3ivwj4w.mongodb.net";
const DB_NAME = "tuiter";
const DB_QUERY = "retryWrites=true&w=majority";
const connectionString = `${PROTOCOL}://${DB_USERNAME}:${DB_PASSWORD}@${HOST}/${DB_NAME}?${DB_QUERY}`;
// connect to the database
mongoose.connect(connectionString, options);

let sess = {
    secret: `${process.env.SECRET}`,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false
    },
    store: MongoStore.create({ mongoUrl: connectionString })
}
app.use(session(sess));

if (process.env.ENV === 'PRODUCTION') {
    app.set('trust proxy', 1)   // trust first proxy
    sess.cookie.secure = true   // serve secure cookies
}

function sayHello(req: Request, res: Response) {
    res.send('Welcome to Foundation of Software Engineering!');
}

// Where we configure server to listen to incoming requests / messages
// HTTP Methods: get, post, put, delete
app.get('/', sayHello);    // get function takes 2 args (string, function); string = pattern of url

app.get('/hello', (req: Request, res: Response) =>
    res.send('Hello World!'));

// create RESTful Web service API
const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const likeController = LikeController.getInstance(app);
const followController = FollowController.getInstance(app);
const bookmarkController = BookmarkController.getInstance(app);
const messageController = MessageController.getInstance(app);
const authenticationController = AuthenticationController.getInstance(app);

/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on AWS if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);