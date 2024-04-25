export type EnvVars = {
  NODE_ENV: string;
  PORT: number;

  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_DATABASE: string;

  AWS_CLOUDFRONT_URL: string;
  AWS_BUCKET_NAME: string;
  AWS_DEFAULT_REGION: string;
  AWS_ACCESS_KEY_ID: string;
  AWS_SECRET_ACCESS_KEY: string;
  AWS_CLOUDFRONT_PRIVATE_KEY: string;
  AWS_CLOUDFRONT_KEY_PAIR_ID: string;

  JWT_SECRET: string;
  ACCESS_TOKEN_EXPIRES_IN: string;
  REFRESH_TOKEN_EXPIRES_IN: string;
};
