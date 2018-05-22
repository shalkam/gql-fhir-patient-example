import passport from 'passport';
import session from 'express-session';
import userModel from '../graphql/_common/acl/user/mongoose';
import connectMongo from 'connect-mongo';
export default (app, db) => {
  // use static authenticate method of model in LocalStrategy
  passport.use(userModel.createStrategy());
  // use static serialize and deserialize of model for passport session support
  passport.serializeUser(userModel.serializeUser());
  passport.deserializeUser(userModel.deserializeUser());
  const mongoStore = connectMongo(session);
  app.use(
    session({
      name: 'ef7ass',
      secret: '2341234',
      saveUninitialized: false,
      resave: false,
      cookie: { httpOnly: false },
      store: new mongoStore({ mongooseConnection: db.connection })
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
};
