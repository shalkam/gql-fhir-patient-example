import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { graphqlExpress } from 'graphql-server-express';
import { apolloUploadExpress } from 'apollo-upload-server';
import cors from 'cors';
import schema from '../graphql/schema';
import config from '../../config';
import acl from 'acl';
import passport from './passport';
import dbConnect from './db';

const app = express();
const self = this;
const db = dbConnect();
app.use(bodyParser.json());
passport(app, db);
//FIXES CORS ERROR
var whitelist = ['http://localhost:8080'];
var corsOptions = {
  origin: function(origin, callback) {
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  },
  credentials: true
};
app.use(cors(corsOptions));
db.connection.on('connected', function(error) {
  if (error) throw error;
  const aclInstance = new acl(new acl.mongodbBackend(db.connection.db, 'acl_'));
  app.use(
    '/' + config.GQL_URL_DIR,
    apolloUploadExpress({
      // Optional, defaults to OS temp directory
      uploadDir: path.resolve(__dirname, 'uploads/tmp')
    }),
    graphqlExpress((req, res) => {
      return { schema, context: { req, acl: aclInstance } };
    })
  );
  const server = app.listen(config.APP_PORT, () => {
    console.log(`server listening at port ${config.APP_PORT}`);
  });
});
