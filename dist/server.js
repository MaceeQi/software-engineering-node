"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const express_1 = __importDefault(require("express"));
const mongoose = __importStar(require("mongoose"));
const UserController_1 = __importDefault(require("./controllers/UserController"));
const TuitController_1 = __importDefault(require("./controllers/TuitController"));
const LikeController_1 = __importDefault(require("./controllers/LikeController"));
const FollowController_1 = __importDefault(require("./controllers/FollowController"));
const BookmarkController_1 = __importDefault(require("./controllers/BookmarkController"));
const MessageController_1 = __importDefault(require("./controllers/MessageController"));
const AuthenticationController_1 = __importDefault(require("./controllers/AuthenticationController"));
var cors = require('cors');
const session = require('express-session'); // express session establish identity and dialogs btwn users and servers exchanging stateless HTTP req/res
const app = (0, express_1.default)(); // express is a library  that allows you to create HTTP servers
const MongoStore = require('connect-mongo');
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
};
app.use(cors(corsOptions)); // cors is tech that allows you to have people outside your domain to connect safely to your server
app.use(express_1.default.json()); // configuring our server so that it can parse json; json = format that data will be formatted as
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4
};
//mongoose.connect('mongodb://localhost:27017/tuiter', options);   // connect to mongo compass - local tuiter database
//mongoose.connect('mongodb+srv://fse_tuiter:m7RwBEdMZHSqPs0k@cluster0.3ivwj4w.mongodb.net/tuiter?retryWrites=true&w=majority',
//options);
// build the connection string
const PROTOCOL = "mongodb+srv";
const DB_USERNAME = "fse_tuiter";
const DB_PASSWORD = "m7RwBEdMZHSqPs0k";
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
};
app.use(session(sess));
if (process.env.ENV === 'PRODUCTION') {
    app.set('trust proxy', 1); // trust first proxy
    sess.cookie.secure = true; // serve secure cookies
}
function sayHello(req, res) {
    res.send('Welcome to Foundation of Software Engineering!');
}
// Where we configure server to listen to incoming requests / messages
// HTTP Methods: get, post, put, delete
app.get('/', sayHello); // get function takes 2 args (string, function); string = pattern of url
app.get('/hello', (req, res) => res.send('Hello World!'));
// create RESTful Web service API
const userController = UserController_1.default.getInstance(app);
const tuitController = TuitController_1.default.getInstance(app);
const likeController = LikeController_1.default.getInstance(app);
const followController = FollowController_1.default.getInstance(app);
const bookmarkController = BookmarkController_1.default.getInstance(app);
const messageController = MessageController_1.default.getInstance(app);
const authenticationController = AuthenticationController_1.default.getInstance(app);
/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on AWS if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);
//# sourceMappingURL=server.js.map