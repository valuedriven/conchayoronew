import { ConfigService } from '@nestjs/config';
import { AppLoggerService } from 'src/core/logger.service';

const logger = new AppLoggerService(new ConfigService());
logger.setContext('Sequelize');

export default () => ({
  port: process.env.PORT,
  database: {
    dialect: process.env.DB_DIALECT || 'sqlite',
    host: process.env.DB_HOSTNAME,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    storage: process.env.DB_STORAGE,
    omitNull: process.env.DB_OMITNULL || true,
    autoLoadModels: process.env.DB_AUTOLOADMODELS || true,
    synchronize: process.env.DB_SYNCRONIZE || true,
    define: {
      timestamps: process.env.DB_TIMESTAMPS || true,
    },
    logging: (msg) => logger.log(msg),
  },
});
