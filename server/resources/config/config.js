module.exports = {
  "development": {
    "username": "sinmiloluwa",
    "password": "JESUS",
    "database": "recipes_dev",
    "host": "127.0.0.1",
    "port": 5432,
    "dialect": "postgres"
  },
  "test": {
    "username": "sinmiloluwa",
    "password": "JESUS",
    "database": "recipes_test1",
    "host": "127.0.0.1",
    "port": 5432,
    "dialect": "postgres"
  },
  "production": {
    "use_env_variable": "DATABASE_URL"
  }
}
