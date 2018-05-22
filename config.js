const config = {
  // App server config
  APP_PORT: 3000,
  APP_URL: 'http://localhost',
  GQL_URL_DIR: 'graphql',
  // Database config
  DB_URL: 'mongodb://localhost:27017',
  DB_HOST: 'localhost',
  DB_PORT: 27017,
  DB_NAME: 'yolkk',
  DB_USERNAME: null,
  DB_PASSWORD: null,
};
if (process.env.HEROKU === '1') {
  config.DB_URL = '';
  config.DB_HOST = '';
  config.DB_PORT = 61210;
  config.DB_NAME = '';
  config.DB_USERNAME = '';
  config.DB_PASSWORD = '';
  config.APP_PORT = process.env.PORT;
}
module.exports = config;
