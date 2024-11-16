import * as dotenv from 'dotenv';
dotenv.config();

interface AppConfig {
  secret: string;
  jwtSecretKey: string;
  jwtExpirationTime: string;
}

const config: AppConfig = {
  secret: process.env.SECRET_KEY || "default_secret_key",
  jwtSecretKey: process.env.JWT_SECRET_KEY || "default_jwt_secret_key",
  jwtExpirationTime: process.env.JWT_EXPIRATION_TIME || "1h",
};

export default config;
