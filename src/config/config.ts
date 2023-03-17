import dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const SERVER_PORT = process.env.SERVER_PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || '';
const JWT_SECRET = process.env.JWT_SECRET || 'MY-SEC';
const MONGO_USERNAME = process.env.MONGO_USERNAME || 'root';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'test';
const MONGO_CLUSTER = process.env.MONGO_CLUSTER || 'test';

export const config = {
  jwt: {
    secret: JWT_SECRET,
  },
  server: {
    port: SERVER_PORT,
    env: NODE_ENV
  },
  mongo: {
    cluster: MONGO_CLUSTER,
    user: MONGO_USERNAME,
    password: MONGO_PASSWORD
  },
};
