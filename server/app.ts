import * as express from 'express';
import * as bodyParser from 'body-parser';
// import * as cookieParser from 'cookie-parser';
import * as path from 'path';
import * as logger from 'morgan';
import * as mongoose from 'mongoose';
import routes from './routes';
// import cors from 'cors';

// Creates and configure expressJS web server
class App{
    public express: express.Application;

    // Run configuration methods on the exress instance
    constructor(){
        this.express= express();
        this.middleware();
        // this.setViews();
        this.configureDB();
        this.routes();
     }

     // Configure express middleware
     private middleware():void{
         this.express.use(logger('dev'));
         this.express.use(bodyParser.json());
         this.express.use(bodyParser.urlencoded({extended:false}));
         // this.express.use(cookieParser());
         this.express.use(express.static(path.join(__dirname, 'public')));
        // enable CORS - Cross Origin Resource Sharing
        //  this.express.use(cors());
     }

     private configureDB():void{
    //     const MONGODB_CONNECTION = 'mongodb://nikhil1210:mongodb1@ds037817,mlab.com:37817/convux';
    //    mongoose.connect(MONGODB_CONNECTION, { server: { socketOptions: { keepAlive: 1 } } });
    //     mongoose.connection.on('error', () => {
    //     throw new Error("unable to connect to database:" +MONGODB_CONNECTION);
    //     });
     }
     private routes():void{
         let router = express.Router();
         // health check
         router.get('/healthcheck', (req,res,next) => {
             res.json("Service is up!!");
         });
         this.express.use('/', router);
         this.express.use('/api', routes);

        // Default to main page, angular route takes over
        // this.express.use((req, res) => {
        // res.sendFile(path.join(__dirname, 'public/index.html'));
        // });

     }

     // setup views
    //  private setViews(){
         // view engine setup
         //this.express.set('views', path.join(__dirname, 'views'));
         //this.express.set('view engine', 'jade');
        // uncomment after placing your favicon in /public
        // this.express.use(favicon(__dirname + '/public/favicon.ico'));
    //  }
}
export default new App().express;