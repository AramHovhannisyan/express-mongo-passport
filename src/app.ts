import express, { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from "helmet";
import hpp from 'hpp';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import logger from 'morgan';
import cors from 'cors';
import path from 'path';
import expressLayouts from 'express-ejs-layouts';
import session from "express-session";
import flash from "connect-flash";
import mongoose from 'mongoose';
import passport from './config/passportConfig';
import { config } from "./config/config";
import { Err } from "./types/ErrorTypes";
import problem from './errorHandling/problem';
import { frontRouter } from './routes/frontRouter';
import { userRouter } from './routes/userRouter';

const app = express();

// Middlewares

// Implement CORS

app.use(cors({
  "origin": "*",
  "methods": "GET,POST",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}));

// Security http headers
app.use(helmet());

if(config.server.env === 'dev'){
  app.use(logger('dev'));
}

// Allow only 100 request in 1h from 1 IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too Many Requests Whit This Ip, Please Try Again Later'
});
app.use('/api', limiter);

// Body Parser, reading data from body into req.body
app.use(express.json({limit: '10kb'}));
app.use(express.urlencoded({extended: true, limit: '10kb'}));
app.use(cookieParser());

app.use(hpp({
  whitelist: []
}));

app.use(compression());
app.use('/public', express.static(path.join(process.cwd(), 'public')));

// EJS
app.use(expressLayouts);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Express Session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));

app.use(flash());

// Global Vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg   = req.flash('error_msg');
  res.locals.error = req.flash('error');

  next();
});

/**
 * Sign in using Email and Password.
 */

app.use(passport.initialize());
app.use(passport.session());

/**
 * Routes
 * Mounting Routes
 */
app.get('/health', (req, res) => res.sendStatus(200));
app.get('/favicon.ico', (req, res) => res.sendStatus(204));

app.use('/', frontRouter);
app.use('/users', userRouter);

app.use((req, res, next) => next(problem(1002, req)));

app.use((err: Err, req: Request, res: Response, next: NextFunction) => {
  const { status, body } = err;
  res.setHeader('Content-Type', 'application/problem+json');
  res.status(status || 500);
  res.json(body);
});

const port = config.server.port || 80;
const username = encodeURIComponent(config.mongo.user);
const password = encodeURIComponent(config.mongo.password);
const clusterUrl = config.mongo.cluster;

const uri = `mongodb+srv://${username}:${password}@${clusterUrl}/?retryWrites=true&w=majority`;

app.listen(port, () => {
  mongoose
    .connect(uri)
    .then(() => {
      console.log('connected to DB');
      console.info(`listening on port ${port}`);
    })
    .catch(err => {
      console.log('error while connecting DB', err);
    });
});