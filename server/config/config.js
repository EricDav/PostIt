import dotenv from 'dotenv';

dotenv.load();
const config = {
  development: {
    username: 'postgres',
    password: 'Iloveodunayo',
    database: 'PostIt',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: 'postgres',
    password: 'Iloveodunayo',
    database: 'postitest',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres'
  },
};
export default config;
