import dotenv from 'dotenv';

dotenv.load();
const config = {
  development: {
    use_env_variable: 'DATABASE_URL'
  },
  test: {
    use_env_variable: 'DATABASE_TEST_URL',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL'
  },
};
export default config;
