import dotenv from 'dotenv';

dotenv.load();
const config = {
  development: {
    use_env_variable: 'DATABASE_URL'
  },
  test: {
    use_env_variable: 'DATABASE_TEST_URL',
    dialect: 'postgres'
  }
};
export default config;
