/**
 * @file Implements an Express Node HTTP server.
 */
import express, {Request, Response} from 'express';
var cors = require('cors')
const app = express();  // express is a library
app.use(cors());        // cors is tech that allows you to have people outside your domain to connect safely to your server
app.use(express.json());        // json = format that data will be formatted as


function sayHello(req: Request, res: Response) {
    res.send('Welcome to Foundation of Software Engineering!');
}

// Where we configure server to listen to incoming requests / messages
// HTP Methods: get, post, put, delete
app.get('/', sayHello);    // get takes 2 args (string, function)

app.get('/hello', (req: Request, res: Response) =>
    res.send('Welcome to Foundation of Software Engineering!'));

/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);
